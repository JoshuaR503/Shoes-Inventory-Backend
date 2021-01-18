import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy, ExtractJwt} from 'passport-jwt';
import { JwtPayload } from "./jwt-payload.interface";
import { User, UserDocument } from "../../user/schema/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {  
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secret'
        });
    }

    async validate(payload: JwtPayload): Promise<User> {

        const {id} = payload;
        const user = await this.userModel.findOne({id});

        if (!user) {
            throw new UnauthorizedException();
        }

        delete user.username;
        delete user.password;
        
        return user;
    }
}