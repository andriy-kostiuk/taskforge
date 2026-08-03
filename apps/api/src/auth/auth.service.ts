import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserInput, type LoginInput } from '@taskforge/contracts';
import argon2 from 'argon2';
import type { StringValue } from 'ms';
import ms from 'ms';

import { AuthTokenService } from 'src/auth/auth-token.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly authTokenService: AuthTokenService,
    private readonly configService: ConfigService
  ) {}

  async register(inputData: CreateUserInput) {
    const { password, ...rest } = inputData;

    const existedUser = await this.userService.findByField({
      email: inputData.email,
    });

    if (existedUser) {
      throw new BadRequestException({
        message: 'User with this email already exist',
      });
    }

    const passwordHash = await argon2.hash(password);

    const user = await this.userService.createWithPasswordHash({
      ...rest,
      passwordHash,
    });

    const tokens = await this.issueTokenPair(user.id);

    return { user, ...tokens };
  }

  private async issueTokenPair(userId: string, sessionId?: string) {
    const normalizeSessionId = sessionId ?? crypto.randomUUID();

    const accessToken = await this.authTokenService.generateAccessToken(userId);
    const refreshToken = await this.authTokenService.generateRefreshToken(
      userId,
      normalizeSessionId
    );

    const refreshTtl =
      this.configService.getOrThrow<StringValue>('JWT_REFRESH_TTL');
    const expiresAt = new Date(Date.now() + ms(refreshTtl));

    const refreshTokenHash = await argon2.hash(refreshToken);

    await this.prisma.session.upsert({
      where: { id: normalizeSessionId },
      update: {
        refreshTokenHash,
        expiresAt,
      },
      create: {
        id: normalizeSessionId,
        refreshTokenHash,
        userId,
        expiresAt,
      },
    });

    return { refreshToken, accessToken };
  }

  async refresh(refreshToken: string) {
    try {
      const { sub: userId, sessionId } =
        await this.authTokenService.verifyRefreshToken(refreshToken);

      const activeSession = await this.prisma.session.findUnique({
        where: { id: sessionId },
      });

      if (!activeSession) {
        throw new UnauthorizedException();
      }

      const doesSessionBelongToUser = userId === activeSession.userId;
      const isSessionExpired = activeSession.expiresAt.getTime() <= Date.now();

      if (!doesSessionBelongToUser || isSessionExpired) {
        throw new UnauthorizedException();
      }

      const isRefreshTokenValid = await argon2.verify(
        activeSession.refreshTokenHash,
        refreshToken
      );

      if (!isRefreshTokenValid) {
        throw new UnauthorizedException();
      }

      return this.issueTokenPair(userId, sessionId);
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async login(data: LoginInput) {
    const { email, password } = data;

    const user = await this.userService.findByField({ email }, { full: true });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordOk = await argon2.verify(user.passwordHash, password);

    if (!isPasswordOk) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.issueTokenPair(user.id);
  }

  async logout(refreshToken: string) {
    try {
      const { sessionId } =
        await this.authTokenService.verifyRefreshToken(refreshToken);

      await this.prisma.session.delete({ where: { id: sessionId } });
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async me(accessToken: string) {
    try {
      const { sub } =
        await this.authTokenService.verifyAccessToken(accessToken);

      return this.userService.findByField({ id: sub });
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
