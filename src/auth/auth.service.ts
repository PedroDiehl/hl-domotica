import { ObjectId } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dtos/CreateUser.dto';
import { User, UserDocument } from '../users/entities/user.entity';


@Injectable()
export class AuthService {

   constructor(
      private readonly jwtService: JwtService,
      private readonly usersService: UsersService,
   ) {}


   async signUp(user: CreateUserDto) {
      const createdUser: UserDocument = await this.usersService.createUser(user);
      return createdUser;
   }

   async signIn(email: string, password: string) {
      const user = await this.usersService.findUserByEmail(email);

      const passwordsMatch = await this.comparePasswords(user, password);
      if (!passwordsMatch) {
         throw new Error('Invalid credentials');
      }

      return {
         accessToken: this.jwtService.sign(user.toObject()), userId: user._id
      };
   }

   async comparePasswords(user: User, candidatePassword: string) {
      return new Promise((resolve, reject) => {
         user.comparePassword(candidatePassword, (error: any, isMatch: boolean) => {
            if (error) {
               console.log('COMPARE PASSWORD ERROR', error);
               reject(error);
            }
            resolve(isMatch);
         });
      });
   }

   async validateUser(id: ObjectId) {
      return await this.usersService.findUserById(id);
   }
}
