import { Field, ObjectType } from "@nestjs/graphql";
import { Shoe } from "src/shoes/shoe.entity";
import { ShoeType } from "src/shoes/shoe.type";

@ObjectType('UserType')
export class UserType {

    @Field()
    token: string;

    @Field()
    id: string;

    @Field()
    username: string;

    @Field(() => [ShoeType])
    shoes: Shoe[];

    // @Field()
    // password: string;

    // @Field(() => [ShoeType])
    // shoes: string[];

}