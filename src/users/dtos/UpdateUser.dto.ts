import { IUser } from "../interfaces/IUser";
import { UserProfileDto } from "./UserProfile.dto";
import { IsOptional, IsString, ValidateNested } from "class-validator";


export class UpdateUserDto implements Partial<IUser> {
   @IsString()
   @IsOptional()
   password: string;

   @IsOptional()
   @ValidateNested({ each: true })
   profile: UserProfileDto;
}
