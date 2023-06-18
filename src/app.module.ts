import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';
import { UsersModule } from './users/users.module';
import { AssetsModule } from './assets/assets.module';
import { DevicesModule } from './devices/devices.module';
import { SignalsModule } from './signals/signals.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule, 
    ConfigModule, 
    SignalsModule, 
    DevicesModule, 
    AuthModule, 
    UsersModule, 
    AssetsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
