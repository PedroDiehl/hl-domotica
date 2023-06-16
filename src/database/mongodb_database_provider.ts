import * as mongoose from 'mongoose';
import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

// See https://mongoosejs.com/docs/guide.html#strictQuery
mongoose.set('strictQuery', false);

export const mongoDatabaseConnectionProvider: FactoryProvider = {
   provide: 'MONGODB_DATABASE_CONNECTION',
   useFactory: async (configService: ConfigService): Promise<typeof mongoose> => {
      let connection: typeof mongoose;

      connection = await mongoose.connect(
         `mongodb+srv://${configService.get('DATABASE_HOST')}`,
         {
            user: configService.get('DATABASE_USER'),
            pass: configService.get('DATABASE_PASSWORD'),
            dbName: configService.get('DATABASE_NAME')
         },
      );

      return connection;
   },
   inject: [ConfigService]
};