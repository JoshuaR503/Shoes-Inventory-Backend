import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shoe } from './shoe.entity';
import { GetShoeDTO } from './dtos/create-shoe.dto';
import { User } from 'src/auth/user.entity';
import { ShoeRepository } from './shoe.repository';

@Injectable()
export class ShoesService {

    constructor(
        @InjectRepository(ShoeRepository) private repository: ShoeRepository
    ) {}

    async getShoes(data: GetShoeDTO, user: User): Promise<Shoe[]> {
        return this.repository.getShoes(data, user);
    }

    // async getShoe(id: string): Promise<Shoe> {
    //     return this.repository.findOne({id});
    // }

    

    // async createShoe(createShoeInput: CreateShoeInput): Promise<Shoe> {
        
    //     const shoe = this.repository.create({
    //         id: uuid(),
    //         ...createShoeInput
    //     });

    //     return this.repository.save(shoe);
    // }
}
