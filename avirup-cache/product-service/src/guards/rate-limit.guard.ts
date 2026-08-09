import { CanActivate, ExecutionContext, Injectable, BadRequestException } from "@nestjs/common";
import { RedisService } from "../redis/redis.service";


@Injectable()
export class RateLimitGuard implements CanActivate {
    constructor(private readonly redisService: RedisService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const ipAddress = request.ip || 'unknown';
        const key = `rate_limit:${ipAddress}`;
        const currentRequest = await this.redisService.client.incr(key);

        if (currentRequest === 1) {
            await this.redisService.client.expire(key, 60); // Set expiration time to 60 seconds
        }

        if (currentRequest > 5) {
            throw new BadRequestException('Too many requests. Please try again later..');
        }

        return true;
    }
}