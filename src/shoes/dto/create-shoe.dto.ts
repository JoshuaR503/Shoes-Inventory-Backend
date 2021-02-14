import { IsOptional } from "class-validator";

export class CreateShoeDTO {    
    title: string;

    writtenCode: string;

    color: string;

    size: string;

    @IsOptional()
    quantity: string;

    @IsOptional()
    note: string;

    @IsOptional()
    entryDate: string;

    magazinePrice: string;

    @IsOptional()
    specialPrice: string;

    status: string;

    @IsOptional()
    archived: boolean;

    @IsOptional()
    salePrice: string;
}