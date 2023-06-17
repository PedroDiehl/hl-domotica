import type { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthTokenDto } from './dtos/authToken.dto';
import { AuthSignInDto } from './dtos/authSignIn.dto';
import { ConfigService } from '../config/config.service';
import { CreateUserDto } from '../users/dtos/CreateUser.dto';
import { UserDocument } from '../users/entities/user.entity';
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


   @Post('sign-up')
   async signUp(@Body(new ValidationPipe()) body: CreateUserDto, @Res() res: Response) {
      try {
         const createdUser = await this.authService.signUp(body);
         res.status(HttpStatus.CREATED).send(createdUser);
      } catch (error) {
         res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
      }
   }

   @Post('sign-in')
   async signIn(@Body(new ValidationPipe()) body: AuthSignInDto, @Res() res: Response) {
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
   }
}
