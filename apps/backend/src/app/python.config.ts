import { Options } from "python-shell";
import { Logger } from "@nestjs/common";

const logger = new Logger('Python Shell');

export const config: Options ={
  mode: 'json',
  pythonPath: 'C:/Python310/python.exe',
  scriptPath: './apps/backend/src/app/scripts/',
  pythonOptions: ['-u'],
  stderrParser: (log)=> logger.verbose(log)
}
