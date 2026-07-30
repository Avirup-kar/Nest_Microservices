import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'validate_user' })
  handleValidateUser(@Payload() data: any): any {
    console.log('Received data:', data);
    if(data.userId === "1"){
      return { status: 'success', user: { id: 1 , name: 'John Doe' } };
    }
    return { status: 'error', message: 'User not found' };
  }
}
