import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'notification-consumer',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'notification-group',
      },
      subscribe: {
        fromBeginning: true,
      }
    },
  });
  
  await app.listen();
  console.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
