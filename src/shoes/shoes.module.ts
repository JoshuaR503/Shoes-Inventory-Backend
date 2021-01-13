import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shoe } from './shoe.entity';
import { ShoeResolver } from './shoe.resolver';
import { ShoesService } from './shoes.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Shoe])
    ],
    providers: [
        ShoeResolver, 
        ShoesService
    ]
})
export class ShoesModule {}
