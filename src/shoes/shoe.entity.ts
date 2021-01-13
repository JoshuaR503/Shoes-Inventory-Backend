import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

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

}