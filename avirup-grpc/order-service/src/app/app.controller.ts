import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

interface InventoryService {
  CheckStock(data: { productId: string }): Observable<{ inStock: boolean; availableQuantity: number }>;
}

@Controller()
export class AppController implements OnModuleInit {
  private inventoryService!: InventoryService;
}
