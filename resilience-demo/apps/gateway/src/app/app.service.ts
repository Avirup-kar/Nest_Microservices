import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import CircuitBreaker from 'opossum';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  private readonly breaker: CircuitBreaker;
  private readonly paymentServiceUrl = 'http://localhost:3001/api/payment/process';

  constructor() {
    const paymentAction = async (amount: number) => {
      return this.executeWithRetry(
        () => axios.post(this.paymentServiceUrl, { amount }),
        3,
        1000,
      );
    };

    const options: CircuitBreaker.Options = {
      timeout: 3000,
      errorThresholdPercentage: 50,
      resetTimeout: 10000,
    };
    this.breaker = new CircuitBreaker(paymentAction, options);

    this.breaker.fallback((amount: number) => {
      this.logger.warn('Circuit is Open. Fallback Response!');
      return {
        status: 'fallback_active',
        message: 'Payment System is currently busy',
        amount,
      };
    });

    this.breaker.on('open', () =>
      this.logger.error('Circuit Breaker State: OPEN (Blocked)'),
    );
    this.breaker.on('close', () =>
      this.logger.log('Circuit Breaker State: CLOSED(Normal)'),
    );
    this.breaker.on('halfOpen', () =>
      this.logger.warn('Circuit Breaker State: HALF_OPEN(Testing)'),
    );
  }

  private async executeWithRetry(
    fn: () => Promise<any>,
    retries: number,
    delay: number,
  ): Promise<any> {
    try {
      const responce = await fn();
      this.logger.log(
      `Request succeeded. Responce: ${JSON.stringify(responce.data)}`,
    );
      return responce.data;
    } catch (error) {
      if(axios.isAxiosError(error) && error.response && error.request.status >= 400 && error.request.status < 500) {
        throw error;
      }
      if(retries <= 0) {
        throw error;
      }

      // const jitter = Math.random() * 200;
      const nextDelay = delay * 9;

      this.logger.warn(`Request Failed!, Retry in ${Math.round(nextDelay)}ms... ${retries} retries left`);

      await new Promise((res) => setTimeout(res, nextDelay))

      return this.executeWithRetry(fn, retries-1, nextDelay)
    }
  }

  async checkout(amount: number ) {
    return this.breaker.fire(amount);
  }
}
