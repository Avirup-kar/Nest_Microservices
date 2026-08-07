import { Controller, OnModuleInit, Inject } from '@nestjs/common';
import { EventPattern, Payload, ClientKafka } from '@nestjs/microservices';

@Controller()
export class AppController implements OnModuleInit {
  constructor(@Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka) {}

  
  async onModuleInit() {
    await this.kafkaClient.connect();
    console.log('Kafka client connected and ready to receive messages');
  }
  
  @EventPattern('user_created')
  async handleUserCreated(@Payload() data: any) {
    try {
      console.log('Received user_created event:', data);
      console.log('Data', data);
      throw new Error('Notification service failed'); // Simulate an error for testing
    } catch (error) {
      console.error('Error processing user_created event:', error);
    }
  }

}

