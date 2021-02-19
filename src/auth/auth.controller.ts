  
import { Controller, Post, Body, ValidationPipe, HttpCode, UseGuards } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { User } from 'src/user/schema/user.schema';
import { GetUser } from './decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return await this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  @HttpCode(200)
  signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<Object> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/refreshToken')
  @UseGuards(AuthGuard())
  async refreshToken(@GetUser() user: User) {
    return await this.authService.refreshToken(user);
  }
}