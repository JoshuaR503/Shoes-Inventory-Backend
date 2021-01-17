import { IsBoolean, IsBooleanString, IsNotEmpty, IsOptional } from "class-validator";

export class ArchiveShoeDTo {
    @IsNotEmpty()
    @IsBooleanString()
    archive: boolean;
}