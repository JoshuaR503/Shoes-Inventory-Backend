import { IsNotEmpty, IsOptional } from "class-validator";

export class CountShoeDto {
    @IsOptional()
    @IsNotEmpty()
    search: string;

    @IsOptional()
    @IsNotEmpty()
    color: string;
    
    @IsOptional()
    @IsNotEmpty()
    archived: boolean;
}