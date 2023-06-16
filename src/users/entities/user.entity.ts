import * as bcrypt from 'bcrypt';
import { HydratedDocument } from 'mongoose';
import { IUser } from '../interfaces/IUser';
import { Role } from '../../auth/roles/enums/Role.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserProfile, UserProfileSchema } from './user-profile.entity';


export type UserDocument = HydratedDocument<User>;


@Schema({ timestamps: true })
export class User implements IUser {
   @Prop({
      type: UserProfileSchema,
      required: true,
   })
   profile: UserProfile;

   @Prop({
      type: String,
      required: true,
      unique: true,
      trim: true,
   })
   password: string;

   @Prop({
      type: String,
      enum: Role,
      required: true,
      default: Role.NOT_VERIFIED,
   })
   role: Role;

   // ! Used for validating password, not stored in database
   comparePassword: (candidatePassword: string, cb: (error: Error, isMatch: boolean) => void) => void;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre('save', function (next) {
   const saltRounds: number = 10;

   if (!this.isModified('password')) {
      return next();
   }

   bcrypt.genSalt(saltRounds, (error: Error, salt: string) => {
      bcrypt.hash(this.password, salt, (error: Error, hash: string) => {
         this.password = hash;
         next();
      })
   })
});

UserSchema.methods.comparePassword = function(
   candidatePassword: string,
   cb: (error: Error, isMatch: boolean) => void
) {
   bcrypt.compare(candidatePassword, this.password, (error: Error, isMatch: boolean) => {
      if (cb) {
         cb(error, isMatch);
      }
   });
}
