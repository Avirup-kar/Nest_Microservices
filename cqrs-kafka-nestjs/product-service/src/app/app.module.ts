import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductConsumer } from './product.consumer';
import { ProductController } from './product.controller';
import { GetProductsHandler } from './queries/get-products.handler';
import { CreateProductHandler } from './commands/create-product.handler';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'cqrs-service',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'cqrs-group',
          },
        },
      },
    ]),
  ],
  controllers: [ProductController, ProductConsumer],
  providers: [CreateProductHandler, GetProductsHandler],
})
export class AppModule {}
