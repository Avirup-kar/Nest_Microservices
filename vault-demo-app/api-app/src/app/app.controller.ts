import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('db-config')
  getData() {
    return {
      message: 'Reading dynamically from hashicorp vault at runtime'
    };
  }
}
