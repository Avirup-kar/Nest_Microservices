import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit {
    public client = createClient({
       url: 'redis://localhost:6379',
    });

    async onModuleInit() {
        await this.client.connect();
        console.log('Redis client connected successfully');
    }
}