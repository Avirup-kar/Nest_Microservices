import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

interface InventoryService {
  CheckStock(data: { productId: string }): { inStock: boolean; availableQuantity: number };
}

@Controller()
export class AppController {
  
}
