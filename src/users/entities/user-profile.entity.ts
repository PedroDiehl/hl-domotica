import { HydratedDocument } from 'mongoose';
import { IUserProfile } from '../interfaces/IUserProfile';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


export type UserProfileDocument = HydratedDocument<UserProfile>;


@Schema({ timestamps: true })
export class UserProfile implements IUserProfile {
   @Prop({
      type: String,
      required: true,
      trim: true,
   })
   firstName: string;

   @Prop({
      type: String,
      required: true,
      trim: true,
   })
   lastName: string;

   @Prop({
      type: String,
      required: true,
      unique: true,
      trim: true,
   })
   email: string;
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);
