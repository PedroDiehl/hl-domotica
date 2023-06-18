import { IAsset } from "../interfaces/IAsset";
import { IsBoolean, IsOptional } from "class-validator";


export class UpdateAssetDto implements Partial<IAsset> {
   @IsBoolean()
   @IsOptional()
   isActive: boolean;
}
