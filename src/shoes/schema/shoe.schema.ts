import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type ShoeDocument = Shoe & Document;

@Schema({versionKey: false})
export class Shoe {
    @Prop()
    id: string;

    @Prop()
    title: string;

    @Prop()
    writtenCode: string;

    @Prop()
    color: string;

    @Prop()
    size: string;

    @Prop()
    quantity: string;

    @Prop()
    note: string;

    @Prop()
    entryDate: string;

    @Prop()
    magazinePrice: string;

    @Prop()
    specialPrice: string;

    @Prop()
    status: string;

    @Prop()
    salePrice: string;

    @Prop({default: false})
    archived: boolean;

    @Prop()
    userId: string;
}

export const ShoeDocument = SchemaFactory.createForClass(Shoe)