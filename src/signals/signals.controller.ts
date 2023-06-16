import { CreateSignalDto } from './dtos/create-signal.dto';
import { 
   Body, 
   Controller, 
   Post, 
   ValidationPipe 
} from '@nestjs/common';

@Controller('signals')
export class SignalsController {

   @Post('create')
   createSignal(@Body(new ValidationPipe()) body: CreateSignalDto) {
      console.log(body);
      return;
   }

}
