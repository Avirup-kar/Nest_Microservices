import { Body, Controller, Get, Post, Inject } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ClientKafka } from "@nestjs/microservices";
import { CreateProductCommand } from "./commands/create-product.command";
import { GetProductsQuery } from "./queries/get-products.queries";

@Controller('products')
export class ProductController {

}