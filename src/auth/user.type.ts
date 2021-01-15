import { Field, ObjectType } from "@nestjs/graphql";
import { ShoeType } from "../shoes/shoe.type";

@ObjectType()
export class UserType {
    @Field()
    id: string;

    @Field()
    username: string;

    @Field(() => [ShoeType])
    shoes: string[];
}