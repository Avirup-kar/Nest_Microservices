import { Injectable, Logger } from '@nestjs/common';
import * as CircuitBreaker from 'opossum';

@Injectable()
export class AppService {
 private readonly logger = new Logger(AppService.name);
 private readonly breaker = CircuitBreaker;
 private readonly paymentServiceUrl = "http://localhost:3001/api/payment/process"

 
}
