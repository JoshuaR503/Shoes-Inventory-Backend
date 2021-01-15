import { Field, ObjectType } from "@nestjs/graphql";
import { Shoe } from "src/shoes/shoe.entity";
import { ShoeType } from "src/shoes/shoe.type";

@ObjectType()
export class UserType {

    @Field()
    id: string;

    @Field()
    username: string;

    @Field()
    token: string;

    @Field(() => [ShoeType])
    shoes: Shoe[];

    // @Field()
    // password: string;

    // @Field(() => [ShoeType])
    // shoes: string[];

}