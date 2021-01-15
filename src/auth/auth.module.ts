import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'secret',
      signOptions: { 
        expiresIn: '60s' 
      },
    }),
    TypeOrmModule.forFeature([UserRepository])
  ],
  providers: [AuthService, JwtStrategy, AuthResolver],
  exports: [AuthService]
})
export class AuthModule {}
