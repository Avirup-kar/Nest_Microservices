import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('process')
  processPayment(@Body() body: {amout: number}) {
    return this.appService.processPayment(body.amout)
  }

  @Get('toggle')
  toggleHealth(@Query('status') status: string) {
    const isHealthy = status === 'true'
    return this.appService.toggleHealth(isHealthy);
  }
}
