import { TypeOrmModuleOptions } from "@nestjs/typeorm"


export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mongodb',
    url: 'mongodb://localhost/shoes',
    synchronize: true,
    useUnifiedTopology: true,
    entities: [__dirname + '/../**/*.entity.{js,ts}']
}