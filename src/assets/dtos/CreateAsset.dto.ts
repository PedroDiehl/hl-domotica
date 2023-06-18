import { IAsset } from "../interfaces/IAsset";
import { AssetType } from "../enums/AssetType";
import { IsBoolean, IsEnum, IsOptional } from "class-validator";


export class CreateAssetDto implements Partial<IAsset> {
   @IsEnum(AssetType)
   assetType: AssetType;

   @IsBoolean()
   @IsOptional()
   isActive: boolean;
}
