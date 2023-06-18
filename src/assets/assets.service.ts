import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { AssetDocument } from './entities/asset.entity';
import { CreateAssetDto } from './dtos/CreateAsset.dto';


@Injectable()
export class AssetsService {

   constructor(
      @Inject('ASSETS_MODEL') 
      private readonly assetsSchema: Model<AssetDocument>,
   ) {}

   async createAsset(createAssetDto: CreateAssetDto) {

      console.log(createAssetDto);

      return;
   }
}
