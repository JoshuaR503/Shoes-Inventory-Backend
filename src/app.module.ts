import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoesModule } from './shoes/shoes.module';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './auth/user.entity';
import { ShoeEntity } from './shoes/shoe.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/shoes',
      synchronize: true,
      useUnifiedTopology: true,
      
      entities: [
        ShoeEntity,
        UserEntity
      ]
    }),
    ShoesModule,
    AuthModule,
  ],
})
export class AppModule {}
