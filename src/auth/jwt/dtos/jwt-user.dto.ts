import { ObjectId } from "mongoose";
import { IjwtUser } from "../interfaces/IjwtUser";
import { 
   IsMongoId, 
} from "class-validator";


export class jwtUserDto implements IjwtUser {
   @IsMongoId()
   _id: ObjectId;
}
