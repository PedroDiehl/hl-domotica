import { IsString } from "class-validator";

export class AuthTokenDto {
   @IsString()
   accessToken: string;

   @IsString()
   expiresIn: string;

   @IsString()
   userId: string;
}
