import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type ShoeDocument = Shoe & Document;

@Schema({versionKey: false})
export class Shoe {
    @Prop()
    id: string;

    @Prop({required: true})
    title: string;

    @Prop({required: true})
    writtenCode: string;

    @Prop({required: true})
    color: string;

    @Prop({required: true})
    size: string;

    @Prop({required: true})
    brand: string;

    @Prop()
    quantity: string;

    @Prop()
    note: string;

    @Prop()
    entryDate: string;

    @Prop()
    createdAt: string;

    @Prop({required: true})
    magazinePrice: string;

    @Prop()
    specialPrice: string;

    @Prop({required: true})
    status: string;

    @Prop({required: true})
    salePrice: string;

    @Prop({default: false})
    archived: boolean;

    @Prop()
    userId: string;
}

export const ShoeDocument = SchemaFactory.createForClass(Shoe)