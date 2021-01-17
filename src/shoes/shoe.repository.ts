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

    async getShoe(id: string, user: User): Promise<Shoe> {
        /// Get shoe from db when matches the shoe id and user id.
        const shoe = await this.findOne({id: id, userId: user.id});
        
        /// Handle errors (if any).
        if (!shoe) {
            throw new HttpException("El zapato que usted está buscando no existe en nuestros registros.", HttpStatus.NOT_FOUND);
        }

        return shoe;
    }

    async getShoes(data: GetShoeDTO, user: User): Promise<Shoe[]> {
        return await this
        .find({userId: user.id})
        .catch((error) => {
            this.logger.error("There was an error getting documents.", error.stack);
            throw new InternalServerErrorException();
        });
    }

    async createShoe(data: CreateShoeDTO, user: User): Promise<Shoe> {
        const shoe = this.create({id: uuid(), ...data, userId: user.id});

        return await this
        .save(shoe)
        .catch((error) => {
            this.logger.error("There was an error saving a document.", error.stack);
            throw new InternalServerErrorException();
        })
    }

    async updateShoe(id: string, data: CreateShoeDTO, user: User): Promise<Shoe> {

        const shoe = await this.getShoe(id, user);

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

        return await shoe.save();
    }

    async deleteShoe(id: string, user: User): Promise<void> {
        const shoe = await this.getShoe(id, user);

        await this.delete(shoe);

    }
}