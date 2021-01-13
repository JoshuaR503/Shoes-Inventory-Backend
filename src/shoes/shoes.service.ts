import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shoe } from './shoe.entity';
import {v4 as uuid} from 'uuid';
import { CreateShoeInput } from './shoe.input';

@Injectable()
export class ShoesService {

    constructor(
        @InjectRepository(Shoe) private repository: Repository<Shoe>
    ) {}

    async getShoe(id: string): Promise<Shoe> {
        return this.repository.findOne({id});
    }

    async getShoes(): Promise<Shoe[]> {
        return this.repository.find();
    }

    async createShoe(createShoeInput: CreateShoeInput): Promise<Shoe> {
        
        const shoe = this.repository.create({
            id: uuid(),
            ...createShoeInput
        });

        return this.repository.save(shoe);
    }
}
