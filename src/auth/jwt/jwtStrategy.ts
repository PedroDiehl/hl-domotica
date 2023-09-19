import { AuthService } from '../auth.service';
import { jwtUserDto } from './dtos/jwt-user.dto';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '../../users/entities/user.entity';
import { ConfigService } from '../../config/config.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
   constructor(
      private readonly authService: AuthService,
      private readonly configService: ConfigService,
   ) {
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         ignoreExpiration: false,
         secretOrKey: configService.get('JWT_SECRET'),
      });
   }

   /**
    * Passport first verifies the JWT's signature and decodes the JSON. 
    * It then invokes this method.
    * 
    * @param payload - The JWT's user data payload. (Decoded JSON)
    * @returns the user object if the user exists in the database.
    */
   async validate(payload: jwtUserDto): Promise<User> {
      const user: User = await this.authService.validateUser(payload._id);

      if (!user) {
         throw new UnauthorizedException()
      }

      return user;
   }
}
