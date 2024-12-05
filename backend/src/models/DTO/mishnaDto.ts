import { IsString, IsBoolean, IsOptional } from "class-validator";

export class MishnaDto {
  @IsString()
  masechet: string;

  @IsString()
  startperek: string;

  @IsOptional()  // The done field is optional when it is not provided in the request body
  @IsBoolean()
  done: boolean = false;  // Default value of done is false
}
