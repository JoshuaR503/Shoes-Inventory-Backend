import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({versionKey: false})
export class User {
    @Prop()
    id: string;

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    email: string;

    @Prop({
        index: true,
        unique: true,
    })
    username: string;

    @Prop({required: true})
    password: string;

    @Prop({default: 'user'})
    role: string;

    @Prop()
    verified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
