import CommandHandler from '@nestjs/cqrs';
import { createProductCommand } from './create-product.command';
import { writeDb } from '../product.store';