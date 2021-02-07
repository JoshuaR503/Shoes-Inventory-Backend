import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ShoesModule } from './shoes/shoes.module';
import { ConfigModule } from '@nestjs/config';

const prodUrl = ``;

// const devUrl = `mongodb://localhost:27017/shoes`;

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb+srv://${process.env.DATABASE_ADMIN}:${process.env.DATABASE_PASSWORD}@cluster0.htdr4.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`, {useCreateIndex: true, useFindAndModify: false}),
    ShoesModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
