import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthTokenService } from './auth-token.service';
import { AuthController } from './auth.controller';
import { AuthCookiesService } from './auth.cookies.service';
import { AuthService } from './auth.service';

import { AuthGuard } from 'src/auth/auth.guard';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [AuthService, AuthTokenService, AuthCookiesService, AuthGuard],
  controllers: [AuthController],
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
      }),
    }),
  ],
  exports: [AuthGuard],
})
export class AuthModule {}
