import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shoe } from './shoe.entity';
import { GetShoeDTO } from './dtos/get-shoe.dto';
import { User } from 'src/auth/user/user.entity';
import { ShoeRepository } from './shoe.repository';
import { CreateShoeDTO } from './dtos/create-shoe.dto';
import { ArchiveShoeDTo } from './dtos/archive-shoe.dto';

@Injectable()
export class ShoesService {

    constructor(
        @InjectRepository(ShoeRepository) private repository: ShoeRepository
    ) {}

    async getShoe(id: string, user: User): Promise<Shoe> {
        return await this.repository.getShoe(id, user);
    }

    async getShoes(data: GetShoeDTO, user: User): Promise<Shoe[]> {
        return await this.repository.getShoes(data, user);
    }

    async createShoe(data: CreateShoeDTO, user: User): Promise<Shoe> {
        return this.repository.createShoe(data, user);
    }

    async updateShoe(id: string, data: CreateShoeDTO, user: User): Promise<Shoe> {
        return this.repository.updateShoe(id, data, user);
    }

    async archiveShoe(id: string, data: boolean, user: User): Promise<Shoe> {
        return this.repository.archiveShoe(id, data, user);
    }

    async deleteShoe(id: string, user: User): Promise<void> {
        return this.repository.deleteShoe(id, user);
    }
}
