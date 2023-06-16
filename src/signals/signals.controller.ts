import { SignalsService } from './signals.service';
import { CreateSignalDto } from './dtos/create-signal.dto';
import { 
   Body, 
   Controller, 
   Post, 
   ValidationPipe 
} from '@nestjs/common';

@Controller('signals')
export class SignalsController {

   constructor(
      private readonly signalsService: SignalsService,
   ) {}

   @Post('create')
   createSignal(@Body(new ValidationPipe()) body: CreateSignalDto) {
      console.log(body);
      return;
   }

}
