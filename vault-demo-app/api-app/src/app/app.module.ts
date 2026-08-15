import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { VaultService } from './vault.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [VaultService],
})
export class AppModule {}
