import { Model, ObjectId } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { UserDocument } from './entities/user.entity';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';

@Injectable()
export class UsersService {

   constructor(
      @Inject('USERS_MODEL') 
      private readonly usersSchema: Model<UserDocument>,
   ) {}

   async createUser(user: CreateUserDto): Promise<UserDocument> {
      const createdUser = new this.usersSchema(user);
      return await createdUser.save();
   }

   async updateUser(userId: string, fieldsToUpdate: UpdateUserDto) {
      const user = await this.findUserById(userId);

      // Needs to set nested objects separately
      if (user.profile) {
         Object.assign(user.profile, fieldsToUpdate.profile)
         delete fieldsToUpdate.profile;
      }

      Object.assign(user, fieldsToUpdate);

      return await user.save();
   }

   async updateUserRole(userId: string, role: string): Promise<UserDocument> {
      return await this.usersSchema.findByIdAndUpdate(userId, { role }, { new: true });
   }

   async deleteUser(userId: string) {
      return await this.usersSchema.findByIdAndDelete(userId);
   }

   async findAllUsers(): Promise<UserDocument[]> {
      return await this.usersSchema.find();
   }

   async findUserById(id: string | ObjectId ): Promise<UserDocument> {
      return await this.usersSchema.findById(id);
   }

   async findUserByEmail(email: string): Promise<UserDocument> {
      return await this.usersSchema.findOne({ "profile.email": email });
   }
}
