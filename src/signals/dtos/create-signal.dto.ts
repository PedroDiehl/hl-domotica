import { IsEnum } from "class-validator";
import { SignalTypes } from "../enums/SignalTypes.enum";


export class CreateSignalDto {
   @IsEnum(SignalTypes)
   signalType: SignalTypes;
}
