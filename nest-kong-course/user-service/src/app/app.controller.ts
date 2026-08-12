import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getUsers() {
    return {
      success: true,
      message: 'Users fetched successfully!',
    };
  }
}
