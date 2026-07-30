import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, Client, Transport } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
}
