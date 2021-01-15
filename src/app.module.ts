import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shoe } from './shoes/shoe.entity';
import { ShoesModule } from './shoes/shoes.module';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';

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
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      
    }),
    ShoesModule,
    AuthModule,
  ],
})
export class AppModule {}
