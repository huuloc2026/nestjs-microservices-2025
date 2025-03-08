import { IsEnum, IsString } from "class-validator";
import { CategoryName } from "./category.enum";

export class CreateCategoryDto {
  @IsEnum(CategoryName)  
  id: keyof typeof CategoryName; 

  @IsString()
  name: string;
}
