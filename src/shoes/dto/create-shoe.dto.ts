import { IsOptional } from "class-validator";

export class CreateShoeDTO {    
    title: string;

    writtenCode: string;

    color: string;

    size: string;

    quantity: string;

    @IsOptional()
    note: string;

    @IsOptional()
    entryDate: string;

    @IsOptional()
    magazinePrice: string;

    @IsOptional()
    specialPrice: string;

    status: string;

    @IsOptional()
    archived: boolean;

    salePrice: string;
}