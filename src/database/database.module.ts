import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { mongoDatabaseConnectionProvider } from './mongodb_database_provider';

@Module({
   imports: [ConfigModule],
   providers: [mongoDatabaseConnectionProvider],
   exports: [mongoDatabaseConnectionProvider],
})
export class DatabaseModule {}
