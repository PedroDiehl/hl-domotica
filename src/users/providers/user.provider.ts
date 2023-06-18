import { Connection } from 'mongoose';
import { FactoryProvider } from '@nestjs/common';
import { UserSchema } from '../entities/user.entity';


export const UsersProvider: FactoryProvider = {
   provide: 'USERS_MODEL',
   useFactory: (connection: Connection) => connection.model('User', UserSchema),
   inject: ['MONGODB_DATABASE_CONNECTION'],
};
