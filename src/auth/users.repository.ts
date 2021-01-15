import { Repository, EntityRepository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { LoginInput } from './types/login.input';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async signUp(loginInput: LoginInput): Promise<boolean> {

    /// Destructure the login input to get the data we want.
    const { username, password } = loginInput;

    /// Create new user.
    const user = new User();

    /// Add all the required fields.
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.shoes = [];

    /// Save user and handle result.
    return await user
    .save()
    .then(() => true)
    .catch((error) => {
      if (error.code === 11000) {
        throw new ConflictException('Username already taken.');
      } else {
        throw new InternalServerErrorException();
      }
    });
  }

  async signIn(loginInput: LoginInput): Promise<User> {
    /// Destructure the login input to get the data we want.
    const { username, password } = loginInput;

    /// See if the user exists in the database.
    const dbUser = await this.findOne({ username });

    /// If user is not in the database, throw error.
    if (!dbUser) {
      throw new UnauthorizedException('These credentials do not match our records.');
    }

    /// See if the password is matches the one in the database.
    const validPassword = await dbUser.validatePassword(password);

    /// If the password is not valid, throw error.
    if (!validPassword) {
      throw new UnauthorizedException('These credentials do not match our records.');
    }

    /// Delete password field and salt field.
    delete dbUser.password;
    delete dbUser.salt;

    /// Return user data without sensitive information.
    return dbUser;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async getUserWithoutSensitiveData(username: string) {

    // Find username.
    const user = await this.findOne({username});

    delete user.password;
    delete user.salt;

    return user;
  }
}