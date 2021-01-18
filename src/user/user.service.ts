import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';
import * as bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { HttpExceptionMessages } from './http-exeption.enum';

@Injectable()
export class UserService {

  private logger = new Logger('User service');

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   *  This funcion is in charge of getting a single document that matches the id of the document.
   * 
   * @param id the id of the document to look for 
   * @returns a single document
   */
  async findOne(id: string): Promise<User> {
    const document = await this.userModel.findOne({id}, '-password');

    /// Handle errors (if any).
    if (!document) {
      throw new HttpException(HttpExceptionMessages.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return document;
  }

  /**
   * This funcion is in charge of getting all the documents in the 'user' table.
   * 
   * @returns an array of user documents
   */
  async findAll(): Promise<User[]> {
    return await this.userModel
    .find({}, '-password -_id')
    .catch((error) => {
      this.logger.error("There was an error getting documents.", error.stack);
      throw new InternalServerErrorException();
    });
  }

  /**
   * This funcion is in charge of getting all the documents in the 'user' table.
   * 
   * @param createUserDto the data sent by the user
   * @returns the newly user document
   */
  async create(createUserDto: CreateUserDto): Promise<void> {
    /// Destructure data sent.
    const {username, password, role} = createUserDto;
    const user =  new this.userModel();

    /// set properties.
    user.id = uuid();
    user.username = username;
    user.password = bcrypt.hashSync(password, 12);
    user.role = role;

    /// save and handle result.
    await user
    .save()
    .catch((error) => {
      if (error.code === 11000) {
        throw new ConflictException(HttpExceptionMessages.USERNAME_IN_USE);
      } else {
        this.logger.error("There was an error creating a documents", error.stack);
        throw new InternalServerErrorException();
      }
    });
  }

  /**
   * This funcion is in charge of updating a single document.
   * 
   * @param id the id of the document to look for 
   * @param dto the data sent by the user
   */
  async update(id: string, dto: UpdateUserDto) {
    return await this.userModel
    .updateOne({id}, dto)
    .then((result) => {

      if (result.n === 0) {
        throw new HttpException(HttpExceptionMessages.NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      return {message: "El usuario ha sido actualizado con éxito"};
    })
    .catch((error) => error);
  }

  /**
   * This funcion is in charge of deleting a single document.
   * 
   * @param id the id of the document to look for 
   */
  async delete(id: string) {
    return await this.userModel
    .deleteOne({id}, )
    .then((result) => {

      if (result.n === 0) {
        throw new HttpException(HttpExceptionMessages.NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      return {message: "El usuario ha sido eliminado con éxito"};
    })
    .catch((error) => error);
  }

}
