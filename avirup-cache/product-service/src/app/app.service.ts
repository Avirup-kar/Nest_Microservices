import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Injectable, Inject } from '@nestjs/common';
import type { Cache } from 'cache-manager';
import{ products } from './fack-db';
 

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getProducts(id: string) {
    const cacheKey = `product:${id}`;
    const cachedProduct = await this.cacheManager.get(cacheKey);

    if (cachedProduct) {
      console.log('cache hit');
      return cachedProduct;
    }

    const product = products.find((p) => p.id === id);
    if(product) {
      await this.cacheManager.set(cacheKey, product);
      console.log('cache miss');
      return product;
    }
  }

  updateProduct(id: string, price: number) {
     const product = products.find((p) => p.id === id);
     if(!product) {
      return {message: 'Product not found'};
     }
     product.price = price;
     const cacheKey = `product:${id}`;
     this.cacheManager.set(cacheKey, product);
      console.log('Product updated');
      return {
       message: 'Product updated successfully',
       product: product
      }
  }
}
