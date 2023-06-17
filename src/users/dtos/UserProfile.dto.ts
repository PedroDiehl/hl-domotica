import { IsString } from "class-validator";
import { IUserProfile } from "../interfaces/IUserProfile";


export class UserProfileDto implements Partial<IUserProfile> {
   @IsString()
   email: string;

   @IsString()
   firstName: string;

   @IsString()
   lastName: string;
}
