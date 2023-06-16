import { 
   IsEmail, 
   IsMongoId, 
   IsNumber, 
} from "class-validator";


export class jwtUserDto {
   @IsMongoId()
   _id: string;

   @IsEmail()
   email: string;

   @IsNumber()
   iat: number;

   @IsNumber()
   exp: number;
}
