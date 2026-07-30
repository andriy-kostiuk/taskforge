# taskforge

## Environment

- Root `.env`: shared backend variables such as `DATABASE_URL` and `WEB_URL`
- `apps/api/.env.local`: API-only local variables such as `PORT`
- `apps/web/.env.local`: web-only local variables such as `NEXT_PUBLIC_API_URL`
