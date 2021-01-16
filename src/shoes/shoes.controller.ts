import { Body, Controller, Get, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateShoeDTO } from './dtos/create-shoe.dto';
import { GetShoeDTO } from './dtos/get-shoe.dto';
import { Shoe } from './shoe.entity';
import { ShoesService } from './shoes.service';

@Controller('shoes')
@UseGuards(AuthGuard())
export class ShoesController {

    constructor(private shoesService: ShoesService) {}
    
    @Get()
    getShoes(
        @Query(ValidationPipe) shoesDTO: GetShoeDTO,
        @GetUser() user: User,
    ): Promise<Shoe[]> {
        return this.shoesService.getShoes(shoesDTO, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createShoe(
        @Body() shoesDTO: CreateShoeDTO,
        @GetUser() user: User,
    ): Promise<Shoe> { 
        return this.shoesService.createShoe(shoesDTO, user);
    }

}
