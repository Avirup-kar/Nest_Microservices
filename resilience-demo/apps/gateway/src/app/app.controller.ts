import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('order')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('checkout')
  async checkout(@Body() body: { amount: number }) {
    return this.appService.checkout(body.amount);
  }
}
