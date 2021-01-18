import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, UseFilters } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from './user.role';
import { AuthGuard } from '@nestjs/passport';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';

@Controller('user')
@UseGuards(AuthGuard())
@UseFilters(new HttpExceptionFilter())

export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  update(
    @Param('id') id: string, 
    @Body() dto: CreateUserDto
  ) {
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
