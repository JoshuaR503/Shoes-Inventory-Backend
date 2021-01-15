import { Repository, EntityRepository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async signUp(username: string, password: string): Promise<boolean> {

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.shoes = [];

    try {
      await user.save();
      return true
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async signIn(username: string, password: string): Promise<User> {
      
    const user = await this.findOne({ username });

    if (user && await user.validatePassword(password)) {
      delete user.password;
      delete user.salt;
      
      return user;
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}