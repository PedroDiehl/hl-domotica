import { IsNumber } from "class-validator";


export class CreateSignalDto {
   @IsNumber()
   latitude: number;

   @IsNumber()
   longitude: number;
}
