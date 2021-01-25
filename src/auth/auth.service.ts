import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './guards/jwt-payload.interface';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  /**
   * This funcion is in charge of creating a new user and storing it's data.
   * 
   * @param authCredentialsDto 
   */
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {

    // Destructure data sent.
    const { username, password } = authCredentialsDto;

    /// Create new user.
    const user = new this.userModel();

    /// set properties
    user.id = uuid();
    user.username = username;
    user.password = bcrypt.hashSync(password, 12);

    await user
    .save()
    .catch((error) => {
      if (error.code === 11000) {
        throw new ConflictException('The username has alreay been taken.');
      } else {
        throw new InternalServerErrorException();
      }
    });
  }

  /**
   * This function is in charge of verifying the data sent from an user, 
   * matches the data we have stored.
   * 
   * @param authCredentialsDto the data sent by the user
   * @returns a token if all the checks pass
   */
  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<Object> {

    // Destructure data sent.
    const { username, password } = authCredentialsDto;

    /// Check if user is in the database.
    const dbUser = await this.userModel.findOne({ username });

    if (!dbUser) {
      throw new UnauthorizedException('These credentials do not match our records.');
    }
    
    /// Check if password matches in the database.
    if (!bcrypt.compareSync(password, dbUser.password)) {
      throw new UnauthorizedException('These credentials do not match our records.');
    }
    
    /// If the app passes all the checks, sign a token.
    const token = this.jwtService.sign({ 
      id: dbUser.id,
      role: dbUser.role,
    });

    return { 
      token,
      role: dbUser.role,
      username
     };
  }
}