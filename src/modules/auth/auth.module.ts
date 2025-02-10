import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { TokenService } from './services/token.service';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from '../redis/redis.module';
import { AuthCacheService } from './services/auth-cache-service';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [RedisModule, JwtModule],
  controllers: [AuthController],
  exports: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAccessGuard,
    },
    AuthService,
    AuthCacheService,
    TokenService,
  ],
})
export class AuthModule {}
