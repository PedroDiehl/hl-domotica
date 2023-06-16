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

   async validate(payload: jwtUserDto): Promise<User> {
      const user: User = await this.authService.validateUser(payload._id);

      if (!user) {
         throw new UnauthorizedException()
      }

      return user;
   }
}