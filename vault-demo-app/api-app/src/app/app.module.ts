import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { vaultService } from './vault.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [vaultService],
})
export class AppModule {}
