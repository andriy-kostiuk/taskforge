import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import {
  createUserSchema,
  type LoginInput,
  loginSchema,
  type CreateUserInput,
} from '@taskforge/contracts';
import type { Request, Response } from 'express';

import { AuthCookiesService } from './auth.cookies.service';
import { AuthService } from './auth.service';

import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authCookiesService: AuthCookiesService
  ) {}

  private getCookieToken(
    request: Request,
    token: 'accessToken' | 'refreshToken'
  ) {
    const tokenFromRequest: unknown = request.cookies?.[token];

    if (!tokenFromRequest || typeof tokenFromRequest !== 'string') {
      throw new UnauthorizedException();
    }

    return tokenFromRequest;
  }

  @Post('/register')
  async register(
    @Body(new ZodValidationPipe(createUserSchema)) body: CreateUserInput,
    @Res({ passthrough: true }) response: Response
  ) {
    const { user, accessToken, refreshToken } =
      await this.authService.register(body);

    this.authCookiesService.setAuthCookies(response, {
      accessToken,
      refreshToken,
    });

    return user;
  }

  @Post('/login')
  async login(
    @Body(new ZodValidationPipe(loginSchema)) body: LoginInput,
    @Res({ passthrough: true }) response: Response
  ) {
    const { accessToken, refreshToken } = await this.authService.login(body);

    this.authCookiesService.setAuthCookies(response, {
      accessToken,
      refreshToken,
    });
  }

  @Post('/refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    const refreshRequestToken = this.getCookieToken(request, 'refreshToken');

    const { accessToken, refreshToken } =
      await this.authService.refresh(refreshRequestToken);

    this.authCookiesService.setAuthCookies(response, {
      accessToken,
      refreshToken,
    });
  }

  @Post('/logout')
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    const refreshRequestToken = this.getCookieToken(request, 'refreshToken');

    await this.authService.logout(refreshRequestToken);

    this.authCookiesService.clearAuthCookies(response);
  }

  @Post('/me')
  getCurrentUser(@Req() request: Request) {
    const accessToken = this.getCookieToken(request, 'accessToken');

    return this.authService.me(accessToken);
  }
}
