import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {
  makeCounterProvider,
  PrometheusModule,
} from '@willsoto/nestjs-prometheus';

@Module({
  imports: [PrometheusModule.register()],
  controllers: [AppController],
  providers: [
    makeCounterProvider({
      name: 'nestjs_http_requests_total',
      help: 'Total HTTP Request Count',
    }),
  ],
})
export class AppModule {}
