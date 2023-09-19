import { HydratedDocument } from 'mongoose';
import { ISignal } from '../interfaces/ISignal';
import { SignalType } from '../enums/SignalType.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


export type DeviceDocument = HydratedDocument<Signal>;


@Schema({ timestamps: true })
export class Signal implements ISignal {
   @Prop({ 
      type: String,
      enum: SignalType,
      default: SignalType.LOCATION 
   })
   signalType: SignalType;

   @Prop({ 
      default: 'Point'
   })
   type: string;

   @Prop({ 
      required: true,
      type: [Number],
   })
   coordinates: number[];
}

export const SignalSchema = SchemaFactory.createForClass(Signal);
