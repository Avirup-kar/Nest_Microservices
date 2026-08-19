import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('payment')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('process')
  processPayment(@Body() body: {amount: number}) {
    return this.appService.processPayment(body.amount)
  }

  @Get('toggle')
  toggleHealth(@Query('status') status: string) {
    const isHealthy = status === 'true'
    return this.appService.toggleHealth(isHealthy);
  }
}
