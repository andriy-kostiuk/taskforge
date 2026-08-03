export interface AccessTokenPayload {
  sub: string;
}

export interface AccessRefreshPayload {
  sub: string;
  sessionId: string;
}
