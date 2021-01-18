import { Module } from '@nestjs/common';
import { ShoesService } from './shoes.service';
import { ShoesController } from './shoes.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Shoe, ShoeDocument } from './schema/shoe.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
              name: Shoe.name,
              schema:  ShoeDocument
            }
        ]),
        AuthModule
    ],
    controllers: [ShoesController],
    providers: [ShoesService]
})
export class ShoesModule {}
