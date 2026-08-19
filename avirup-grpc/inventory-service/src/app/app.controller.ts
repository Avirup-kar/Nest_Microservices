import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AppController {
  @GrpcMethod('InventoryService', 'CheckStock')
  checkStock(data: { productId: string }) {
    const items: Record<string, number> = {
      '123': 50,
      '456': 0 
    }
    
    
    const qty = items[data.productId] || 0;
    console.log(`Received request for product ID: ${data.productId}`);

    return { 
      inStock: qty > 0, 
      availableQuantity: qty 
    };
  }
}
