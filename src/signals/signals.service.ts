import { Model } from 'mongoose';
import { SignalDocument } from '../devices/entities/device.entity';
import { 
   Inject, 
   Injectable 
} from '@nestjs/common';
import { CreateSignalDto } from './dtos/create-signal.dto';

@Injectable()
export class SignalsService {

   constructor(
      @Inject('SIGNALS_MODEL') 
      private readonly signalsSchema: Model<SignalDocument>,
   ) {}

   async createSignal(createSignalDto: CreateSignalDto) {
      
   }
}
