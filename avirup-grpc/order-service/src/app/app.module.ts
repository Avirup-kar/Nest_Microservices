import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'INVENTORY_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'inventory',
          protoPath: join(process.cwd(), 'lib/proto/inventory.proto'),
          url: 'localhost:50051',
        },
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
