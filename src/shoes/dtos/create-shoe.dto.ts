import { IsNotEmpty, IsOptional } from "class-validator";

export class GetShoeDTO {
    @IsOptional()
    @IsNotEmpty()
    search: string;

    @IsOptional()
    @IsNotEmpty()
    color: string;
}