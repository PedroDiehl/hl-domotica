import { Module } from '@nestjs/common';
import { SignalsService } from './signals.service';
import { SignalsController } from './signals.controller';
import { DatabaseModule } from '../database/database.module';
import { SignalsProvider } from './providers/signals.provider';


@Module({
  imports: [DatabaseModule],
  providers: [SignalsService, SignalsProvider],
  controllers: [SignalsController]
})
export class SignalsModule {}
