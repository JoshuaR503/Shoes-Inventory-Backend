import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mongodb',
    //   url: 'mongodb://localhost/shoes',
    //   synchronize: true,
    //   useUnifiedTopology: true,
    //   entities: [
    //     Shoe,
    //     User
    //   ]
    // }),
    MongooseModule.forRoot('mongodb://localhost/shoes', {useCreateIndex: true, useFindAndModify: false}),
    // ShoesModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
