import { UnauthorizedException } from '@nestjs/common';
import { type Request } from 'express';

export function getCookieToken(
  request: Request,
  token: 'accessToken' | 'refreshToken'
) {
  const tokenFromRequest: unknown = request.cookies?.[token];

  if (!tokenFromRequest || typeof tokenFromRequest !== 'string') {
    throw new UnauthorizedException();
  }

  return tokenFromRequest;
}
