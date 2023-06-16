import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { NodeEnviroments } from './enums/NodeEnviroments.enum';


@Injectable()
export class ConfigService {
   private readonly envConfig: { [key: string]: string }

   /**
    * Initialize the ConfigService
    * 
    * @param envVariableFilePath - Path to load the environment variable from
    */
   constructor(envVariableFilePath: string) {
      const isProduction: boolean = process.env.NODE_ENV === NodeEnviroments.Production;

      if (!isProduction) {
         this.envConfig = dotenv.parse(fs.readFileSync(envVariableFilePath))
      }
   }

   /**
    * Get the key with `process.env`
    * 
    * @param enviromentVariableName - Name of the environment variable
   */
   get(enviromentVariableName: string): string {
      try {
         const enviromentVariableValue: string = process.env[enviromentVariableName] || this.envConfig[enviromentVariableName];
         if (enviromentVariableValue) {
            return enviromentVariableValue.split(String.raw`\n`).join('\n');
         }
      } catch(error) {}
      console.log(`Requested Config Key [ ${enviromentVariableName} ] not defined!`);
      return null;
   }
}
