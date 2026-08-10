import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GetProductsQuery } from './get-products.cueries';
import { readDb } from '../product.store';

@CommandHandler(GetProductsQuery)
export class GetProductsHandler implements ICommandHandler<GetProductsQuery> {
    
}