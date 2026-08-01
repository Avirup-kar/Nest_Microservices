import { Controller, Get, Inject, OnModuleInit, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { lastValueFrom, Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';

interface InventoryService {
  CheckStock(data: { productId: string }): Observable<{ inStock: boolean; availableQuantity: number }>;
}

@Controller()
export class AppController implements OnModuleInit {
  private inventoryService!: InventoryService;

  constructor(@Inject('INVENTORY_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.client.getService<InventoryService>('InventoryService');
  }

  @Get('check-item')
  async bcheckItem(@Query('pid') pid: string) {
     const stockStatus = await lastValueFrom(this.inventoryService.CheckStock({ productId: pid }));
  }
}
