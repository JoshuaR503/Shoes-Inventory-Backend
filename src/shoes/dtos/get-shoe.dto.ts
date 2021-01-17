import { Type} from 'class-transformer';
import { IsBoolean, IsBooleanString, IsNotEmpty, IsOptional } from "class-validator";

export class GetShoeDTO {
    @IsOptional()
    @IsNotEmpty()
    search: string;

    @IsOptional()
    @IsNotEmpty()
    color: string;
    
    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    @Type(()=>Boolean)
    archived: boolean;
}