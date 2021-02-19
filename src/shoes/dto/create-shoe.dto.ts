import { IsOptional } from "class-validator";

export class CreateShoeDTO {    
    title: string;

    writtenCode: string;

    @IsOptional()
    color: string;

    @IsOptional()
    size: string;

    brand: string;

    @IsOptional()
    quantity: string;

    @IsOptional()
    note: string;

    @IsOptional()
    magazinePrice: string;

    @IsOptional()
    specialPrice: string;

    status: string;


    @IsOptional()
    archived: boolean;

    salePrice: string;
}