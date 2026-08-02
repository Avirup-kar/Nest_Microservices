import { Controller, Get, Inject, OnModuleInit, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { lastValueFrom, Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';

interface InventoryService {
  CheckStock(data: { productId: string }): Observable<{ inStock: boolean; availableQuantity: number }>;
}

@Controller('order')
export class AppController implements OnModuleInit {
  private inventoryService!: InventoryService;

  constructor(@Inject('INVENTORY_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
   this.inventoryService = this.client.getService<InventoryService>('InventoryService');
  }

  @Get('check-item')
  async bcheckItem(@Query('pid') pid: string) {
    console.log(`Received request to check stock for product ID: ${pid}`);
     const stockStatus = await lastValueFrom(this.inventoryService.CheckStock({ productId: pid }));
     if (stockStatus.inStock) {
      return `Product with ID ${pid} is in stock. Available quantity: ${stockStatus.availableQuantity}`;
     } else {
      return `Product with ID ${pid} is out of stock.`;
     }
  }
}
