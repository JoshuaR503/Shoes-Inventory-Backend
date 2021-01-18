import { BaseEntity, Column, Entity, ObjectIdColumn, PrimaryColumn, Unique } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { UserRole } from "./user.role";


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


    @Column({type: 'enum', enum: UserRole, default: UserRole.USER})
    role: UserRole;

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);

        return hash === this.password;
    }
}