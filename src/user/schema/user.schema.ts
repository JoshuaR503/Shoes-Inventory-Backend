import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import * as bcrypt from 'bcryptjs';
import { UserRole } from "../user.role";

export type UserDocument = User & Document;

@Schema()
export class User {

    // @ObjectIdColumn()
    // _id: string;

    @Prop()
    id: string;

    @Prop({
        index: true,
        unique: true,
    })
    username: string;

    @Prop()
    password: string;


    @Prop({default: 'user'})
    role: string;

    
}

export const UserSchema = SchemaFactory.createForClass(User);
