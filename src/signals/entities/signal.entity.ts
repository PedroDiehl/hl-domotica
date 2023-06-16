import { HydratedDocument } from 'mongoose';
import { ISignal } from '../interfaces/ISignal';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


export type DeviceDocument = HydratedDocument<Signal>;


@Schema({ timestamps: true })
export class Signal implements ISignal {
   @Prop({
      type: String,
      required: true,
      unique: true,
      trim: true,
   })
   signalId: string;
}

export const SignalSchema = SchemaFactory.createForClass(Signal);
