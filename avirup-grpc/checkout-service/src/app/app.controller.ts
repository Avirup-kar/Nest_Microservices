import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('checkout')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('process')
  async processCheckout() {
    return this.appService.discoverAndCallPayment();
  }
}
