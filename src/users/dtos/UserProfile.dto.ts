import { IsEmail, IsString } from "class-validator";
import { IUserProfile } from "../interfaces/IUserProfile";


export class UserProfileDto implements Partial<IUserProfile> {
   @IsEmail()
   email: string;

   @IsString()
   firstName: string;

   @IsString()
   lastName: string;
}
