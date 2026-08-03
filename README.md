# taskforge

## Environment

- Root `.env`: shared backend variables such as `DATABASE_URL`, `WEB_URL`, `JWT_SECRET`, `JWT_ACCESS_TTL`, and `JWT_REFRESH_TTL`
- `apps/api/.env.local`: API-only local variables such as `PORT`
- `apps/web/.env.local`: web-only local variables such as `NEXT_PUBLIC_API_URL`
