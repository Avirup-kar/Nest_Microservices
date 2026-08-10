import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetProductsQuery } from './get-products.cueries';
import { readDb } from '../product.store';

@QueryHandler(GetProductsQuery)
export class GetProductsHandler implements IQueryHandler<GetProductsQuery> {
    async execute() {
        return readDb;
    }
}