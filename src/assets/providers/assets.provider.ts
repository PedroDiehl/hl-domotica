import { Connection } from 'mongoose';
import { FactoryProvider } from '@nestjs/common';
import { AssetSchema } from '../entities/asset.entity';


export const AssetsProvider: FactoryProvider = {
   provide: 'ASSETS_MODEL',
   useFactory: (connection: Connection) => connection.model('Asset', AssetSchema),
   inject: ['MONGODB_DATABASE_CONNECTION'],
};
