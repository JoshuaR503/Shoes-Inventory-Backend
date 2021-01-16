import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoesService } from './shoes.service';
import { ShoesController } from './shoes.controller';
import { ShoeRepository } from './shoe.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ShoeRepository]),
        AuthModule
    ],
    controllers: [ShoesController],
    providers: [ShoesService]
})
export class ShoesModule {}
