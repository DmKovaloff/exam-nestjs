import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './modules/redis/redis.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/filter/global-exception.filter';
import { LoggerModule } from './modules/logger/logger.module';
import { RepositoryModule } from './modules/repository/repository.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    LoggerModule,
    PostModule,
    RepositoryModule,
    RedisModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    DatabaseModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
