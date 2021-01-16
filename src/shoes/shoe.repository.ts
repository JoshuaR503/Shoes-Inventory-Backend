import { InternalServerErrorException, Logger } from "@nestjs/common";
import { isUUID } from "class-validator";
import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateShoeDTO } from "./dtos/create-shoe.dto";
import { GetShoeDTO } from "./dtos/get-shoe.dto";
import { Shoe } from "./shoe.entity";
import { v4 as uuid } from 'uuid';

@EntityRepository(Shoe)
export  class ShoeRepository extends Repository<Shoe> {

    private logger = new Logger('Shoe Repository');

    async getShoes(data: GetShoeDTO, user: User): Promise<Shoe[]> {

        // const query = this.createQueryBuilder('shoe');
        
        // query.where('shoe.userId = :userId', {userId: user.id});

        try {
            return await this.find({userId: user.id})
            
        } catch (error) {
            this.logger.error('Failed to get shoes.', error.stack);
            throw new InternalServerErrorException();
        }
    }

    async createShoe(data: CreateShoeDTO, user: User): Promise<Shoe> {
        const shoe = this.create({
            id: uuid(),
            ...data,
            userId: user.id
        });

        return await this.save(shoe);
    }
}