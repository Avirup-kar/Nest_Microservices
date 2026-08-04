import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { port: 8889 },
  });
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
  console.log('Hybrid app is running on port (3000) (REST) and port (8889) (TCP)');
}
bootstrap();
