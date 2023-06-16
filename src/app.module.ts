import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { SignalsModule } from './signals/signals.module';
import { DevicesModule } from './devices/devices.module';

@Module({
  imports: [DatabaseModule, ConfigModule, SignalsModule, DevicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
