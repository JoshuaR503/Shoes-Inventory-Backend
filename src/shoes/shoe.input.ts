import { Field, InputType } from "@nestjs/graphql";
import { IsDateString, IsNumber, MinLength } from "class-validator";

@InputType()
export class CreateShoeInput {

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

    @IsDateString()
    @Field()
    entryDate: string;

    @IsNumber()
    @Field()
    magazinePrice: number;

    @IsNumber()
    @Field()
    specialPrice: number;

    @IsNumber()
    @Field()
    salePrice: number;

}