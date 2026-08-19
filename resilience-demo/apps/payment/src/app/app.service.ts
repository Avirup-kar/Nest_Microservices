import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AppService {
  private isServiceHealthy = true;

  processPayment(amount: number) {
    if (!this.isServiceHealthy) {
      throw new HttpException(
        'Payment gatway is down',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      status: 'success',
      transactionId: `TXN-${Math.floor(Math.random() * 1000000)}`,
      amount,
    };
  }

  toggleHealth(status: boolean) {
    this.isServiceHealthy = status;
    return {
      status: `Payment service health is set to I ${this.isServiceHealthy}`,
    };
  }
}
