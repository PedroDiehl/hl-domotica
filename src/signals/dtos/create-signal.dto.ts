import { IsEnum } from "class-validator";
import { SignalType } from "../enums/SignalType.enum";


export class CreateSignalDto {
   @IsEnum(SignalType)
   signalType: SignalType;
}
