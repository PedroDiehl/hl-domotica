import { HydratedDocument } from 'mongoose';
import { IDevice } from '../interfaces/IDevice';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


export type SignalDocument = HydratedDocument<Device>;


@Schema({ timestamps: true })
export class Device implements IDevice {
   @Prop({
      type: String,
      required: true,
      unique: true,
      trim: true,
   })
   deviceId: string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
