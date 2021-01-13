import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CreateShoeInput } from "./shoe.input";
import { ShoeType } from "./shoe.type";
import { ShoesService } from "./shoes.service";

@Resolver(returns => ShoeType)
export class ShoeResolver {
    constructor( private service: ShoesService ) {}

    @Query(_ => ShoeType)
    shoe(@Args('id') id: string) {
        return this.service.getShoe(id)
    }

    @Mutation(_ => ShoeType)
    createShoe(@Args('createShoeInput') shoeInput: CreateShoeInput) {
        return this.service.createShoe(shoeInput)
    }
}