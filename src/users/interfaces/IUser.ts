import { IUserProfile } from "./IUserProfile";
import { Role } from "../../auth/roles/enums/Role.enum";


export interface IUser {
   profile: IUserProfile;
   password: string;
   role: Role;
}
