import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shoe } from './shoes/shoe.entity';
import { ShoesModule } from './shoes/shoes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/shoes',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [
        Shoe
      ]
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    ShoesModule
  ],
  providers: [],
})
export class AppModule {}
