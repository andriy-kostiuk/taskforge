import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthTokenService } from './auth-token.service';
import { AuthController } from './auth.controller';
import { AuthCookiesService } from './auth.cookies.service';
import { AuthService } from './auth.service';

import { UserModule } from 'src/user/user.module';

@Module({
  providers: [AuthService, AuthTokenService, AuthCookiesService],
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
})
export class AuthModule {}
