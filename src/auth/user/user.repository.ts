import { Repository, EntityRepository } from 'typeorm';
import { ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { User } from './user.entity';
import { v4 as uuid } from 'uuid';
import { UserRole } from './user.role';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {

    const { username, password } = authCredentialsDto;
    const user = new User();
    
    user.id = uuid();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    // user.role =  role as UserRole;

    try {

      await user.save();

    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('The username has alreay been taken.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  /// This function is in charge of making sure that the user data sent,
  /// matches with the data in the database.
  async signIn(authCredentialsDto: AuthCredentialsDto) {

    // Destructure data sent.
    const { username, password } = authCredentialsDto;

    /// Check if user is in the database.
    const dbUser = await this.findOne({ username });

    if (!dbUser) {
      throw new UnauthorizedException('These credentials do not match our records.');
    }
    
    /// Check if password matches in the database.
    const validPassword = dbUser.validatePassword(password);

    if (!validPassword) {
      throw new UnauthorizedException('These credentials do not match our records.');
    }
  
    /// If the data passed all the tests, retun the username.
    return {
      id:  dbUser.id,
      role: dbUser.role
    };
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}