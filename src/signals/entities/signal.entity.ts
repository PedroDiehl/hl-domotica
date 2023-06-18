import { HydratedDocument } from 'mongoose';
import { ISignal } from '../interfaces/ISignal';
import { SignalType } from '../enums/SignalType.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


export type DeviceDocument = HydratedDocument<Signal>;


@Schema({ 
   timestamps: true, 
   timeseries: {
      timeField: 'timestamp',
      metaField: 'metadata',
   }
})
export class Signal implements ISignal {
   @Prop({
      type: Object,
      required: true,
   })
   metadata: {
      signalType: SignalType;
   };

   @Prop({
      type: Date,
      required: true,
   })
   timestamp: Date;
}

export const SignalSchema = SchemaFactory.createForClass(Signal);
