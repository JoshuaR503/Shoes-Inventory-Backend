import { BaseEntity, Column, Entity, ObjectIdColumn, OneToMany, PrimaryColumn, Unique } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { Shoe } from "src/shoes/shoe.entity";

@Entity()
@Unique(['username'])
export class User extends BaseEntity {

    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    // @OneToMany(type => Shoe, shoe => shoe.user, {eager: true})
    // shoes: Shoe[];

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);

        return hash === this.password;
    }
}