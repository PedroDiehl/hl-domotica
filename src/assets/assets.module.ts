import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { AssetsProvider } from './providers/assets.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [AssetsService, AssetsProvider],
  controllers: [AssetsController],
})
export class AssetsModule {}
