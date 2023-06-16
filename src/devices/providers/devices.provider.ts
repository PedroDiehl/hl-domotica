import { Connection } from 'mongoose';
import { FactoryProvider } from '@nestjs/common';
import { DeviceSchema } from '../entities/device.entity';

export const DevicesProvider: FactoryProvider = {
   provide: 'DEVICES_MODEL',
   useFactory: (connection: Connection) => connection.model('Device', DeviceSchema),
   inject: ['MONGODB_DATABASE_CONNECTION'],
};