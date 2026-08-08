import { Controller, Get, OnModuleInit, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';


@Controller()
export class AppController implements OnModuleInit {
  constructor(@Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka) {}

  async onModuleInit() {
    // Subscribe to the response topic for the 'test' message
    this.kafkaClient.connect();
  }

  @Get('create-user')
  async createUser() {
    const user = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com'
    };

    // Send the 'create-user' message to the Kafka topic
    this.kafkaClient.emit('user_created', user);
    return { message: 'User creation event sent to Kafka', user };
  }
}
