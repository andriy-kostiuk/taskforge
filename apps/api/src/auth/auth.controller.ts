import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
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

import { AuthGuard } from 'src/auth/auth.guard';
import type { CurrentUserData } from 'src/auth/auth.types';
import { getCookieToken } from 'src/auth/auth.utils';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authCookiesService: AuthCookiesService,
    private readonly userService: UserService
  ) {}

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
    const refreshRequestToken = getCookieToken(request, 'refreshToken');

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
    const refreshRequestToken = getCookieToken(request, 'refreshToken');

    await this.authService.logout(refreshRequestToken);

    this.authCookiesService.clearAuthCookies(response);
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  getCurrentUser(@CurrentUser() user: CurrentUserData) {
    return this.userService.findByField({ id: user.userId });
  }
}
