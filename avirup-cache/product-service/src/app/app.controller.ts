import { Controller, Get, Param, Patch } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('products/:id')
  async getProducts(@Param('id') id: string) {
    return this.appService.getProducts(id);
  }

  @Get('update/:id/:price')
  updateProduct(@Param('id') id: string, @Param('price') price: number) {
    return this.appService.updateProduct(id, price);
  }
}