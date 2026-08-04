import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return 'Hello from REST api';
  }

  @MessagePattern({ cmd: 'get_Status' })
  getStatus(data: any): string {
    return 'Hello from TCP microservice';
  }
}
