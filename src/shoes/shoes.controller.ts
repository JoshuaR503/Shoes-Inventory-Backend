import { Body, Controller, Delete, Get, Param, ParseBoolPipe, Patch, Post, Put, Query, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { User } from 'src/user/schema/user.schema';
import { UserRole } from 'src/user/user.role';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { CreateShoeDTO } from './dto/create-shoe.dto';
import { GetShoeDTO } from './dto/get-shoe.dto';
import { Shoe } from './schema/shoe.schema';
import { ShoesService } from './shoes.service';

@Controller('shoes')
@UseGuards(AuthGuard())
@UseFilters(new HttpExceptionFilter())
export class ShoesController {

    constructor(private shoesService: ShoesService) {}

    @Get()
    // @UseGuards(RolesGuard)
    // @Roles(UserRole.USER)
    getShoes(
        @Query(ValidationPipe) shoesDTO: GetShoeDTO,
        @GetUser() user: User,
    ): Promise<Shoe[]> {
        return this.shoesService.getShoes(shoesDTO, user);
    }

    @Get(':id')
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

    @Put(':id')
    @UsePipes(ValidationPipe)
    updateShoe(
        @Param('id') id: string,
        @Body() shoesDTO: CreateShoeDTO,
        @GetUser() user: User,
    ) { 
        return this.shoesService.updateShoe(id, shoesDTO, user);
    }

    // @Patch('/:id')
    // @UsePipes(ValidationPipe)
    // archiveShoe(
    //     @Param('id') id: string,
    //     @Body('archived', ParseBoolPipe) archived: boolean,
    //     @GetUser() user: User,
    // ) { 
    //     return this.shoesService.archiveShoe(id, archived, user);
    // }

    @Delete(':id')
    @UsePipes(ValidationPipe)
    deleteShoe(
        @Param('id') id: string,
        @GetUser() user: User,
    ): Promise<void> { 
        return this.shoesService.deleteShoe(id, user);
    }

}
