import { IsOptional } from "class-validator";

export class CreateShoeDTO {
    @IsOptional()
    title: string;

    @IsOptional()
    writtenCode: string;

    @IsOptional()
    color: string;

    @IsOptional()
    size: string;

    @IsOptional()
    quantity: string;

    @IsOptional()
    note: string;

    @IsOptional()
    entryDate: string;

    @IsOptional()
    magazinePrice: string;

    @IsOptional()
    specialPrice: string;

    @IsOptional()
    archived: boolean;

    @IsOptional()
    salePrice: string;
}