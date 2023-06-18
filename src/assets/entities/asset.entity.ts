import { HydratedDocument } from 'mongoose';
import { IAsset } from '../interfaces/IAsset';
import { AssetType } from '../enums/AssetType';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


export type AssetDocument = HydratedDocument<Asset>;


@Schema({ timestamps: true })
export class Asset implements IAsset {
   @Prop({
      type: String,
      enum: AssetType,
      required: true,
      trim: true,
   })
   assetType: AssetType;

   @Prop({
      type: Boolean,
      required: true,
      default: false,
   })
   isActive: boolean;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);
