import { User } from "src/auth/user.entity";
import { Column, Entity, ManyToOne, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class Shoe {

    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    id: string;

    @Column()
    writtenCode: string;

    @Column()
    color: string;

    @Column()
    size: string;

    @Column()
    quantity: number;

    @Column()
    note: string;

    @Column()
    entryDate: string;

    @Column()
    magazinePrice: number;

    @Column()
    specialPrice: number;

    @Column()
    salePrice: number;

    @ManyToOne(type => User, user => user.shoes, {eager: false})
    user: User;

    @Column()
    userId: number;
}