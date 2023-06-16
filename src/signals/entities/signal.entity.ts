import { HydratedDocument } from 'mongoose';
import { ISignal } from '../interfaces/ISignal';
import { SignalTypes } from '../enums/SignalTypes.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


export type DeviceDocument = HydratedDocument<Signal>;


@Schema({ timestamps: true })
export class Signal implements ISignal {
   @Prop({
      type: Object,
      required: true,
      unique: true,
      trim: true,
   })
   metadata: {
      signalType: SignalTypes;
   };

   @Prop({
      type: Date,
      required: true,
   })
   timestamp: Date;
}

export const SignalSchema = SchemaFactory.createForClass(Signal);
