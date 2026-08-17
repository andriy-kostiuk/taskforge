import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { AuthTokenService } from 'src/auth/auth-token.service';
import { AuthenticatedRequest } from 'src/auth/auth.types';
import { getCookieToken } from 'src/auth/auth.utils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authTokenService: AuthTokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const accessToken = getCookieToken(request, 'accessToken');

    const payload = await this.authTokenService.verifyAccessToken(accessToken);

    request.user = { userId: payload.sub };

    return true;
  }
}
