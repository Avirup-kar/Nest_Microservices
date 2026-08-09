import { CanActivate, ExecutionContext, Injectable, BadRequestException } from "@nestjs/common";
import { RedisService } from "../redis/redis.service";


@Injectable()
export class RateLimitGuard implements CanActivate {
    constructor(private readonly redisService: RedisService) {}
}