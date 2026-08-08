import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Injectable, Inject } from '@nestjs/common';
import type { Cache } from 'cache-manager';
import{ products } from './fack-db';
 

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getProducts(id: number) {
     const cacheKey = `product:${id}`;
    const cachedProduct = await this.cacheManager.get(cacheKey);

    if (cachedProduct) {
      console.log('cache hit');
      return cachedProduct;
    }

    const product = products.find((p) => p.id === id);
    if(product) {
      await this.cacheManager.set(cacheKey, product);
      return product;
    }
    console.log('cache miss');
  }

  updateProduct(id: number, price: number) {
     const product = products.find((p) => p.id === id);
     if(product) {
      p
     }
  }
}
