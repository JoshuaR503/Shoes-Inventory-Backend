import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
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

  async signUp(username: string, password: string): Promise<boolean> {
    return await this.userRepository.signUp(username, password);
  }
  
  async signIn(username: string, password: string): Promise<string> {
    const user = await this.userRepository.signIn(username, password);
    const payload = { user };
    const token = this.jwtService.sign(payload);

    return token;
  }
}