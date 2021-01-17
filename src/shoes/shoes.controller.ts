import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { ArchiveShoeDTo } from './dtos/archive-shoe.dto';
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

    @Get('/:id')
    @UseFilters(new HttpExceptionFilter())
    getShoe(
        @Param('id') id: string,
        @GetUser() user: User,
    ): Promise<Shoe> {
        return this.shoesService.getShoe(id, user);
    }
    
    @Post()
    @UsePipes(ValidationPipe)
    createShoe(
        @Body() shoesDTO: CreateShoeDTO,
        @GetUser() user: User,
    ): Promise<Shoe> { 
        return this.shoesService.createShoe(shoesDTO, user);
    }

    @Put('/:id')
    @UsePipes(ValidationPipe)
    updateShoe(
        @Param('id') id: string,
        @Body() shoesDTO: CreateShoeDTO,
        @GetUser() user: User,
    ): Promise<Shoe> { 
        return this.shoesService.updateShoe(id, shoesDTO, user);
    }

    @Patch('/:id')
    @UsePipes(ValidationPipe)
    archiveShoe(
        @Param('id') id: string,
        @Body() data: ArchiveShoeDTo,
        @GetUser() user: User,
    ): Promise<Shoe> { 
        return this.shoesService.archiveShoe(id, data, user);
    }

    @Delete('/:id')
    @UsePipes(ValidationPipe)
    deleteShoe(
        @Param('id') id: string,
        @GetUser() user: User,
    ): Promise<void> { 
        return this.shoesService.deleteShoe(id, user);
    }

}
