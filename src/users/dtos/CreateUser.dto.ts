import { IsString } from "class-validator";
import { IUser } from "../interfaces/IUser";
import { UserProfileDto } from "./UserProfile.dto";


export class CreateUserDto implements Partial<IUser> {
   @IsString()
   password: string;

   // Validation is inside object
   profile: UserProfileDto;
}
