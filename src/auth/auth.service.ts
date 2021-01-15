import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginInput } from './types/login.input';
import { User } from './user.entity';
import { UserType } from './user.type';
import { UserRepository } from './users.repository';

export interface JwtPayload {
  username: string;
}

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async signUp(loginInput: LoginInput): Promise<boolean> {
    return await this.userRepository.signUp(loginInput);
  }
  
  async signIn(loginInput: LoginInput): Promise<UserType> {

    /// Find user in database.
    const dbUser = await this.userRepository.signIn(loginInput);

    /// Create a JWT token.
    const token = this.jwtService.sign({dbUser});

    /// Combine token with user to match the user type.
    const userType = {token, ...dbUser};

    /// Return data.
    return userType;
  }
}