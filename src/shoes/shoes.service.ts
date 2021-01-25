import { HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Shoe, ShoeDocument } from './schema/shoe.schema';
import { GetShoeDTO } from './dto/get-shoe.dto';
import { CreateShoeDTO } from './dto/create-shoe.dto';
import { Model } from 'mongoose';
import { HttpExceptionMessages } from 'src/user/http-exeption.enum';
import { v4 as uuid } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schema/user.schema';
import { CountShoeDto } from './dto/count-shoe.dto';

@Injectable()
export class ShoesService {

    private logger = new Logger('Shoes Service');

    constructor(
        @InjectModel(Shoe.name) private readonly shoeModel: Model<ShoeDocument>,
     ) {}

     /**
     * Returns the count of documents matching certains params.
     * 
     * @param data a set of parameters
     * @param user the owner of the document
     * @returns an integer representing the amount of shoes matching the criteria.
     */
    async countShoes(criteria: CountShoeDto, user: User) {
        const { archived } = criteria;
        const conditions = {
            userId: user.id,
            archived: JSON.parse(String(archived)),
        };

        return await this.shoeModel
        .countDocuments(conditions)
        .then((count) => JSON.stringify({'total': count}))
        .catch((error) => {
            this.logger.error("There was an error getting documents.", error.stack);
            throw new InternalServerErrorException();
        });
    }

    /**
     * Returns a document from the databse based on the id.
     * 
     * @param id the id of the document to look for
     * @param user the owner of the document
     * @returns the document from the database
     */
    async getShoe(id: string, user: User): Promise<Shoe> {
        /// Get shoe from db when matches the shoe id and user id.
        const document = await this.shoeModel.findOne({id: id, userId: user.id});
        
        /// Handle errors (if any).
        if (!document) {
            throw new HttpException(HttpExceptionMessages.NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        /// Return document
        return document;
    }

    /**
     * Returns all the documents from the database.
     * 
     * @param data a set of parameters
     * @param user the owner of the document
     * @returns an array of all the Shoe documents matching data parameters
     */
    async searchShoes(data: GetShoeDTO, user: User): Promise<Shoe[]> {
        const { archived, search } = data;
        const regex = new RegExp(search, 'i');

        const conditions = {
            userId: user.id,
            archived: JSON.parse(String(archived)),
        };

        return await this.shoeModel
        .find(conditions)
        .or([
            {'color': regex},
            {'quantity': regex},
            {'title': regex},
            {'size': regex},
            {'note': regex},
            {'magazinePrice': regex},
            {'salePrice': regex},
            {'specialPrice': regex}
        ])
        .exec()
        .catch((error) => {
            this.logger.error("There was an error getting documents.", error.stack);
            throw new InternalServerErrorException();
        });
    }

    /**
     * Returns all the documents from the database.
     * 
     * @param data a set of parameters
     * @param user the owner of the document
     * @returns an array of all the Shoe documents matching data parameters
     */
    async getShoes(data: GetShoeDTO, user: User): Promise<Shoe[]> {
        const { archived } = data;
        const conditions = {
            userId: user.id,
            archived: JSON.parse(String(archived)),
        };
        
        return await this.shoeModel
        .find(conditions)
        .catch((error) => {
            this.logger.error("There was an error getting documents.", error.stack);
            throw new InternalServerErrorException();
        });
    }

    /**
     * Creates a new Shoe document in the database and returns the result.
     * 
     * @param data the document data
     * @param user the creator of the document
     * @returns the  created document in the database
     */
    async createShoe(data: CreateShoeDTO, user: User): Promise<Shoe> {
        const shoe = await this.shoeModel.create({
            id: uuid(),
            ...data,
            userId: user.id,
            createdAt: new Date(Date.now()).toLocaleDateString(),
            entryDate: `${new Date(Date.now()).toLocaleDateString()} @ ${new Date(Date.now()).toLocaleTimeString()}`
        });

        return shoe
        .save()
        .catch((error) => {
            console.log(error);
            this.logger.error("There was an error saving a document.", error.stack);
            throw new InternalServerErrorException();
        });
    }

    /**
     * Updates a document based on its ID.
     * 
     * @param id the document's id
     * @param data the new document's data
     * @param user the owner of the document
     * @returns a the updated document in the database
     */
    async updateShoe(id: string, data: CreateShoeDTO, user: User) {
        /// Save and return the shoe in the database.
        return await this.shoeModel.updateOne({id, userId: user.id}, data)
        .then((result) => {

            if (result.n === 0) {
                throw new HttpException(HttpExceptionMessages.NOT_FOUND, HttpStatus.NOT_FOUND);
            }
            
            return {message: "El usuario ha sido actualizado con éxito"};
        })
        .catch((error) => {
            this.logger.error("There was an error updating a document.", error.stack);
            throw new InternalServerErrorException();
        });
    }

    /**
     * Deletes a document from the database based on its ID.
     * 
     * @param id the document's id
     * @param user the owner of the document
     */
    async deleteShoe(id: string, user: User): Promise<void> {
        return this.shoeModel
        .remove({id: id, userId: user.id})
        .then((result) => {

            if (result.n === 0) {
              throw new HttpException(HttpExceptionMessages.NOT_FOUND, HttpStatus.NOT_FOUND);
            }
      
            return {message: "El usuario ha sido eliminado con éxito"};
        })
        .catch((error) => error);
    }
}
