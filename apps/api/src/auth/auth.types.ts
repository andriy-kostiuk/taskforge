import { type Request } from 'express';

export interface AccessTokenPayload {
  sub: string;
}

export interface RefreshTokenPayload {
  sub: string;
  sessionId: string;
}

export interface CurrentUserData {
  userId: string;
}

export interface AuthenticatedRequest extends Request {
  user: CurrentUserData;
}
