import { OmitType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
    OmitType(CreateUserDto, ['password'] as const)
) {}
