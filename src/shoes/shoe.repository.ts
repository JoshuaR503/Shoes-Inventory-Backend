import { InternalServerErrorException, Logger } from "@nestjs/common";
import { UserEntity } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { GetShoeDTO } from "./dtos/create-shoe.dto";
import { ShoeEntity } from "./shoe.entity";

@EntityRepository(ShoeEntity)
export  class ShoeRepository extends Repository<ShoeEntity> {

    private logger = new Logger('Task Repository');

    async getShoes(data: GetShoeDTO, user: UserEntity ): Promise<ShoeEntity[]> {

        const { search } = data;
        const query = this.createQueryBuilder('task');
        
        query.where('shoe.userId = :userId', {userId: user.id});

        if (search) {
            query.andWhere('(shoe.title LIKE :search OR shoe.color LIKE :search)', {search: `%${search}%`})
        }

        try {
            return await query.getMany();
        } catch (error) {

            this.logger.error(`Failed to get tasks:`, error.stack);
            
            throw new InternalServerErrorException();
        }

    }
}