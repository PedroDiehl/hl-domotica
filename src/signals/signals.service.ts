import { Model } from 'mongoose';
import { CreateSignalDto } from './dtos/create-signal.dto';
import { SignalDocument } from '../devices/entities/device.entity';
import { 
   Inject, 
   Injectable 
} from '@nestjs/common';


@Injectable()
export class SignalsService {
   constructor(
      @Inject('SIGNALS_MODEL') 
      private readonly signalsSchema: Model<SignalDocument>,
   ) {}

   async createSignal(createSignalDto: CreateSignalDto) {
      const formattedSignalData = this.formatCoordinates(createSignalDto);
      const signal = new this.signalsSchema(formattedSignalData);
      return await signal.save();
   }

   formatCoordinates(createSignalDto: CreateSignalDto) {
      return {
         coordinates: [createSignalDto.longitude, createSignalDto.latitude]
      }
   }
}
