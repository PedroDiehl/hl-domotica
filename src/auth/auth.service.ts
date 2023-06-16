import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {

   constructor(
      private readonly jwtService: JwtService,
      private readonly usersService: UsersService,
   ) {}


   async signIn(email: string, password: string) {
      const user = await this.usersService.findUserByEmail(email);

      const passwordsMatch = await this.comparePasswords(user, password);
      if (!passwordsMatch) {
         throw new Error('Invalid credentials');
      }

      const cleanUser = await this.usersService.findUserByEmail(email);

      return {
         accessToken: this.jwtService.sign(cleanUser.toObject()), userId: user._id
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

   async validateUser(id: string) {
      return await this.usersService.findUserById(id);
   }
}
