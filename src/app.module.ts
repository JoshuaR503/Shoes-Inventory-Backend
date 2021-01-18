import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoesModule } from './shoes/shoes.module';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user/user.entity';
import { Shoe } from './shoes/shoe.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/shoes',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [
        Shoe,
        User
      ]
    }),
    ShoesModule,
    AuthModule,
  ],
})
export class AppModule {}
