
import { IsString, MinLength, MaxLength, Matches, IsOptional, IsEmail } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z]).*$/,
    { message: 'Password is too weak.' },
  )
  readonly password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsOptional()
  readonly name: string;

  @IsEmail()
  @IsOptional()
  readonly email: string;

}