import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [],
  controllers: [AppController],
})
export class AppModule {}
