import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class Shoe extends BaseEntity {

    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    writtenCode: string;

    @Column()
    color: string;

    @Column()
    size: string;

    @Column()
    quantity: string;

    @Column()
    note: string;

    @Column()
    entryDate: string;

    @Column()
    magazinePrice: string;

    @Column()
    specialPrice: string;

    @Column()
    salePrice: string;

    // @ManyToOne(type => User, user => user.shoes, {eager: false})
    // user: User;

    @Column()
    userId: string;
}