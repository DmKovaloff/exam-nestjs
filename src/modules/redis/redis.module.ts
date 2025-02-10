import { Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

import { Config, RedisConfig } from '../../config/config.type';
import { RedisService } from './redis.service';
import { REDIS_CLIENT } from './redis.constants';

const redisProvider: Provider = {
  provide: REDIS_CLIENT,
  useFactory: (configService: ConfigService<Config>) => {
    const config = configService.get<RedisConfig>('redis');
    return new Redis({
      port: config.port,
      host: config.host,
      password: config.password,
    });
  },
  inject: [ConfigService],
};

@Module({
  providers: [RedisService, redisProvider],
  exports: [RedisService, redisProvider],
})
export class RedisModule {}
