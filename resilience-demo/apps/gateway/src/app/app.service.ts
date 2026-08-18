import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import CircuitBreaker from 'opossum';

@Injectable()
export class AppService {
 private readonly logger = new Logger(AppService.name);
 private readonly breaker: CircuitBreaker;
 private readonly paymentServiceUrl = "http://localhost:3001/api/payment/process"

 constructor() {
  const paymentAction = async (amount: number) {
    return this.executeWithRetry(() => axios.post(this.paymentServiceUrl, {amount}), 3, 1000)
  } 

  const options: CircuitBreaker.Options = {
    timeout: 3000,
    errorThresholdPercentage: 50,
    resetTimeout: 10000,
  }
  this.breaker = new CircuitBreaker(paymentAction, options);

  this.breaker.fallback((amount: number) => {
   this.logger.warn('Circuit is Open. Fallback Response!')
   return {
    status: 'fallback_active',
    message:'Payment System is currently busy',
    amount
   }
  })

  this.breaker.on('open', () => this.logger.error('Circuit Breaker State: OPEN (Blocked)'));
  this.breaker.on('close', () => this.logger.log('Circuit Breaker State: CLOSED(Normal)'))
 }
}
