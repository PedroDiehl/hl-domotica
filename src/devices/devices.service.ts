import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { DeviceDocument } from '../signals/entities/signal.entity';


@Injectable()
export class DevicesService {

   constructor(
      @Inject('DEVICES_MODEL') 
      private readonly devicesSchema: Model<DeviceDocument>,
   ) {}
}
