import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';
import { VaultService } from './vault.service';

@Controller()
export class AppController {
  constructor(private readonly vaultService: VaultService) {}

  @Get('db-config')
  getData() {
    return {
      message: 'Reading dynamically from hashicorp vault at runtime',
      dbUrl: this.vaultService.getDatabaseUrl(),
    };
  }
}
