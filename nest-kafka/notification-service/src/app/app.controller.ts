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
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('Error processing user_created event:', errorMessage);
      console.log('Sending Event to dead-letter-queue');
      this.kafkaClient.emit('user_created_dlq', {
        failedData: data,
        error: errorMessage,
        failedAt: new Date()
      })
    }
  }

  @EventPattern('user_created_dlq')
  handleDLQ(@Payload() data: any) {
    console.log('Received user_created_dlq event');
    console.log(data);
  }

}

