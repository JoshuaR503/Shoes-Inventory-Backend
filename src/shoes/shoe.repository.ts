import { HttpException, HttpStatus, InternalServerErrorException, Logger } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateShoeDTO } from "./dtos/create-shoe.dto";
import { GetShoeDTO } from "./dtos/get-shoe.dto";
import { Shoe } from "./shoe.entity";
import { v4 as uuid } from 'uuid';

@EntityRepository(Shoe)
export  class ShoeRepository extends Repository<Shoe> {

    private logger = new Logger('Shoe Repository');

    /**
     * Returns a document from the databse based on the id.
     * 
     * @param id the id of the document to look for
     * @param user the owner of the document
     * @returns the document from the database
     */
    async getShoe(id: string, user: User): Promise<Shoe> {
        /// Get shoe from db when matches the shoe id and user id.
        const shoe = await this.findOne({id: id, userId: user.id});
        
        /// Handle errors (if any).
        if (!shoe) {
            throw new HttpException("El zapato que usted está buscando no existe en nuestros registros.", HttpStatus.NOT_FOUND);
        }

        return shoe;
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
        }
        
        return await this
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
        const shoe = this.create({id: uuid(), ...data, userId: user.id});

        return await this
        .save(shoe)
        .catch((error) => {
            this.logger.error("There was an error saving a document.", error.stack);
            throw new InternalServerErrorException();
        });
    }

    /**
     * Updates the archived status of a Shoe document.
     * 
     * @param id the document's id
     * @param archived the value of the document's archived property
     * @param user the owner of the document
     * @returns the updated document in the database
     */
    async archiveShoe(id: string, archived: boolean, user: User): Promise<Shoe> {

        /// Get the shoe document from the database.
        const shoe = await this.getShoe(id, user);

        /// Update the archived property with the one sent by the user.
        shoe.archived = archived;

        /// Save and return.
        return await shoe
        .save()
        .catch((error) => {
            this.logger.error("There was an error updating a document.", error.stack);
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
    async updateShoe(id: string, data: CreateShoeDTO, user: User): Promise<Shoe> {

        /// Get the shoe from the database.
        const shoe = await this.getShoe(id, user);

        /// Update all properties
        shoe.title = data.title;
        shoe.writtenCode = data.writtenCode;
        shoe.size = data.size;
        shoe.quantity = data.quantity;
        shoe.note = data.note;
        shoe.color = data.color;

        shoe.entryDate = data.entryDate;
        shoe.magazinePrice = data.magazinePrice;
        shoe.specialPrice = data.specialPrice;
        shoe.salePrice = data.salePrice;

        /// Save and return the shoe in the database.
        return await shoe
        .save()
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
        /// Get shoe from the database.
        const shoe = await this.getShoe(id, user);

        /// Delete shoe from the database.
        await this
        .delete(shoe)
        .catch((error) => {
            this.logger.error("There was an error deleting a document.", error.stack);
            throw new InternalServerErrorException();
        });

    }
}