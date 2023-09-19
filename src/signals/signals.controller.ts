import { SignalsService } from './signals.service';
//import { Role } from '../auth/roles/enums/Role.enum';
//import { Roles } from '../auth/roles/roles.decorator';
//import { RolesGuard } from '../auth/roles/roles.guard';
//import { JwtAuthGuard } from '../auth/jwt/jwtAuthGuard';
import { CreateSignalDto } from './dtos/create-signal.dto';
import { 
   Body, 
   Controller, 
   Post, 
//   UseGuards, 
   ValidationPipe 
} from '@nestjs/common';


//@UseGuards(JwtAuthGuard, RolesGuard)
//@Roles(Role.SUPER)
@Controller('signals')
export class SignalsController {
   constructor(
      private readonly signalsService: SignalsService,
   ) {}

   @Post('create')
   async createSignal(@Body(new ValidationPipe()) body: CreateSignalDto) {
      return await this.signalsService.createSignal(body);
   }

}
