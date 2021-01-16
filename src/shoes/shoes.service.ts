import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shoe } from './shoe.entity';
import { GetShoeDTO } from './dtos/get-shoe.dto';
import { User } from 'src/auth/user.entity';
import { ShoeRepository } from './shoe.repository';
import { CreateShoeDTO } from './dtos/create-shoe.dto';

@Injectable()
export class ShoesService {

    constructor(
        @InjectRepository(ShoeRepository) private repository: ShoeRepository
    ) {}

    async getShoes(data: GetShoeDTO, user: User): Promise<Shoe[]> {
        return await this.repository.getShoes(data, user);
    }

    async createShoe(data: CreateShoeDTO, user: User): Promise<Shoe> {
        return this.repository.createShoe(data, user);
    }
}
