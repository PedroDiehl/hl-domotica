import { Model, ObjectId } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { UserDocument } from './entities/user.entity';
import { CreateUserDto } from './dtos/CreateUser.dto';

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

   async updateUser() {}

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
