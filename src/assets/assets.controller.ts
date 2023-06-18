import { AssetsService } from './assets.service';
import { Role } from '../auth/roles/enums/Role.enum';
import { Roles } from '../auth/roles/roles.decorator';
import { RolesGuard } from '../auth/roles/roles.guard';
import { JwtAuthGuard } from '../auth/jwt/jwtAuthGuard';
import { CreateAssetDto } from './dtos/CreateAsset.dto';
import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';


@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPER)
@Controller('assets')
export class AssetsController {

   constructor(
      private readonly assetsService: AssetsService,
   ) {}

   @Post('create-asset')
   async createAsset(@Body(new ValidationPipe()) createAssetDto: CreateAssetDto) {

      await this.assetsService.createAsset(createAssetDto);

      return;
   }
}
