import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import {Strategy, ExtractJwt} from 'passport-jwt';
import { JwtPayload } from "./jwt-payload.interface";
import { UserRepository } from "../user/user.repository";
import { User } from "../user/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository) private userRepository: UserRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secret'
        });
    }

    async validate(payload: JwtPayload): Promise<User> {

        const {id} = payload;
        const user = await this.userRepository.findOne({id});

        if (!user) {
            throw new UnauthorizedException();
        }

        delete user._id;
        delete user.username;

        delete user.password;
        delete user.salt;
        
        return user;
    }
}