import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'inventory',
      protoPath: join(process.cwd(), 'lib/proto/inventory.proto'),
      url: 'localhost:50051',
    },
  });
  await app.listen();
  console.log(
    `🚀 GRPS service running on: http://localhost:50051`,
  );
}

bootstrap();
