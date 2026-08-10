import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { readDb } from './product.store';

@Controller()
export class ProductConsumer {
    @EventPattern('product_created')
    async handleProductCreated(@Payload() data: any) {
        readDb.push(data);
        console.log('Read Model Updated!');
    }
}