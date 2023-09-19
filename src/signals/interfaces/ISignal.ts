import { SignalType } from "../enums/SignalType.enum";


export interface ISignal {
   signalType: SignalType;
   type: string;
   coordinates: number[];
}