import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AppService {
  private isServiceHealthy = true;

  processPayment(amount: number) {
    if(!this.isServiceHealthy){
      throw new HttpException('Payment gatway is down', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    return { status: "success" }
  }
}
