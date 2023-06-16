import { Connection } from 'mongoose';
import { FactoryProvider } from '@nestjs/common';
import { SignalSchema } from '../entities/signal.entity';

export const DevicesProvider: FactoryProvider = {
   provide: 'SIGNALS_MODEL',
   useFactory: (connection: Connection) => connection.model('Signal', SignalSchema),
   inject: ['MONGODB_DATABASE_CONNECTION'],
};