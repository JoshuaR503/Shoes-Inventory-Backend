import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ShoeType {
    @Field()
    id: string;

    @Field()
    writtenCode: string;

    @Field()
    color: string;

    @Field()
    size: string;

    @Field()
    quantity: number;

    @Field()
    note: string;

    @Field()
    entryDate: string;

    @Field()
    magazinePrice: number;

    @Field()
    specialPrice: number;

    @Field()
    salePrice: number;
}