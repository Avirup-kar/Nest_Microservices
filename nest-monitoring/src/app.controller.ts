import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';

@Controller()
export class AppController {
  constructor(
    @InjectMetric('nestjs_http_requests_total')
    private readonly requestCounter: Counter<string>,
  ) {}

  @Get()
  getHello(): String {
    this.requestCounter.inc();
    return 'Hello World! NestJS App Monitoring'
  }
}
