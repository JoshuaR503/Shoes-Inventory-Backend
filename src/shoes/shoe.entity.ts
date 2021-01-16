import { UserEntity } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ShoeEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
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

    @ManyToOne(type => UserEntity, user => user.shoes, {eager: false})
    user: UserEntity;

    @Column()
    userId: number;
}