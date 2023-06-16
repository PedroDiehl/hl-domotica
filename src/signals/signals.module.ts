import { Module } from '@nestjs/common';
import { SignalsService } from './signals.service';
import { SignalsController } from './signals.controller';
import { SignalsProvider } from './providers/signals.provider';


@Module({
  providers: [SignalsService, SignalsProvider],
  controllers: [SignalsController]
})
export class SignalsModule {}
