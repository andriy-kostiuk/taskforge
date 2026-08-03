import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { CookieOptions, Response } from 'express';
import type { StringValue } from 'ms';
import ms from 'ms';

@Injectable()
export class AuthCookiesService {
  constructor(private readonly configService: ConfigService) {}

  private get baseCookieOptions(): CookieOptions {
    return {
      httpOnly: true,
      sameSite: 'lax',
      secure: this.configService.get('NODE_ENV') === 'production',
      path: '/',
    };
  }

  private get accessTokenCookieOptions(): CookieOptions {
    return {
      ...this.baseCookieOptions,
      maxAge: ms(this.configService.getOrThrow<StringValue>('JWT_ACCESS_TTL')),
    };
  }

  private get refreshTokenCookieOptions(): CookieOptions {
    return {
      ...this.baseCookieOptions,
      maxAge: ms(this.configService.getOrThrow<StringValue>('JWT_REFRESH_TTL')),
    };
  }

  setAuthCookies(
    response: Response,
    tokens: { accessToken: string; refreshToken: string }
  ): void {
    response.cookie(
      'accessToken',
      tokens.accessToken,
      this.accessTokenCookieOptions
    );

    response.cookie(
      'refreshToken',
      tokens.refreshToken,
      this.refreshTokenCookieOptions
    );
  }

  clearAuthCookies(response: Response): void {
    response.clearCookie('accessToken', this.accessTokenCookieOptions);

    response.clearCookie('refreshToken', this.refreshTokenCookieOptions);
  }
}
