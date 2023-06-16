import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesProvider } from './providers/devices.provider';

@Module({
  providers: [DevicesService, DevicesProvider],
})
export class DevicesModule {}
