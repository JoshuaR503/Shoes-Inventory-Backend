
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/users.repository';
import { User } from './user.entity';

export interface JwtPayload {
  username: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',

    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const {username} = payload;
    const user = await this.userRepository.findOne({username});

    if (!user) {
      throw new UnauthorizedException();
    }
    
    return user;
  }
}