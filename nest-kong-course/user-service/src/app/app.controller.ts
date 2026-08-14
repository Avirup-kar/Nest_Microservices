import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class AppController {

  @Get()
  getUsers() {
    return {
      success: true,
      message: 'Users fetched successfully!',
      serveByPort: process.env.PORT || 3000,
    };
  }
}
