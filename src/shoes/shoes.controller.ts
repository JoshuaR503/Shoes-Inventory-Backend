import { Controller, Get, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { UserEntity } from 'src/auth/user.entity';
import { GetShoeDTO } from './dtos/create-shoe.dto';
import { ShoeEntity } from './shoe.entity';
import { ShoesService } from './shoes.service';

@Controller('shoes')
@UseGuards(AuthGuard())
export class ShoesController {

    constructor(private shoesService: ShoesService) {}
    
    @Get()
    getShoes(
        @Query(ValidationPipe) filterDTO: GetShoeDTO,
        @GetUser() user: UserEntity,
    ): Promise<ShoeEntity[]> {
        return this.shoesService.getShoes(filterDTO, user);
    }

}
