import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesProvider } from './providers/devices.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [DevicesService, DevicesProvider],
})
export class DevicesModule {}
