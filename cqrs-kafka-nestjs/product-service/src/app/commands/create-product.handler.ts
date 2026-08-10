import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { createProductCommand } from './create-product.command';
import { writeDb } from '../product.store';

@CommandHandler(createProductCommand)
export class CreateProductHandler implements ICommandHandler<createProductCommand> {
    async execute(command: createProductCommand) {
        const product = {
            id: Date.now(),
            name: command.name,
        }
        writeDb.push(product);
        return product;
    }
}