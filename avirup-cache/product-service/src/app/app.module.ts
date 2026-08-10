import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { RedisService } from '../redis/redis.service';
import { RateLimitGuard } from '../guards/rate-limit.guard';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: await redisStore({
           socket: {
            host: 'localhost',
            port: 6379,
          },
          ttl: 60000, // 1 minute
        })
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, RedisService, RateLimitGuard],
})
export class AppModule {}
