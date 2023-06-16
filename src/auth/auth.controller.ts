import type { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthTokenDto } from './dtos/authToken.dto';
import { AuthSignInDto } from './dtos/authSignIn.dto';
import { ConfigService } from '../config/config.service';
import { 
   Body,
   Controller, 
   HttpStatus, 
   Post, 
   Res, 
   ValidationPipe 
} from '@nestjs/common';


@Controller('auth')
export class AuthController {

   constructor(
      private readonly authService: AuthService,
      private readonly configService: ConfigService,
   ) {}

   @Post('sign-in')
   async signIn(@Body(new ValidationPipe()) body: AuthSignInDto, @Res() res: Response): Promise<AuthTokenDto> {
      try {
         const { accessToken, userId } = await this.authService.signIn(body.email, body.password);

         res.status(HttpStatus.ACCEPTED).send({
            accessToken,
            expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
            userId
         });

      } catch (error) { 
         res.status(HttpStatus.UNAUTHORIZED).send('Invalid credentials.');
      }

      return;
   }
}
