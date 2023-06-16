import { Model, ObjectId } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {

   constructor(
      @Inject('USERS_MODEL') 
      private readonly usersSchema: Model<UserDocument>,
   ) {}

   async findUserById(id: string | ObjectId ): Promise<UserDocument> {
      return await this.usersSchema.findById(id);
   }

   async findUserByEmail(email: string): Promise<UserDocument> {
      return await this.usersSchema.findOne({ "profile.email": email });
   }
}
