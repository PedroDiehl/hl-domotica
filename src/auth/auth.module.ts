import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwtStrategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';


@Module({
   imports: [
      UsersModule, 
      ConfigModule,
      PassportModule,
      JwtModule.registerAsync({
         imports: [ConfigModule],
         useFactory: async (configService) => {
            return {
               secret: configService.get('JWT_SECRET'),
               signOptions: {
                  expiresIn: configService.get('JWT_EXPIRATION_TIME')
               }
            }
         },
         inject: [ConfigService],
      }),
   ],
   providers: [AuthService, JwtStrategy],
   controllers: [AuthController]
})
export class AuthModule {}
