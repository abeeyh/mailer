import { Injectable, Logger, LoggerService } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileLogger extends Logger implements LoggerService {
  private writeStream: fs.WriteStream;

  constructor(context: string) {
    super(context);
    this.initializeLogFile();
  }

  private initializeLogFile() {
    const logFilePath = path.join(__dirname, 'application.log');
    this.writeStream = fs.createWriteStream(logFilePath, { flags: 'a' });
  }

  log(message: string) {
    super.log(message);
    this.writeStream.write(`Log: ${message}\n`);
  }

  error(message: string, trace: string) {
    super.error(message, trace);
    this.writeStream.write(`Error: ${message}\nTrace: ${trace}\n`);
  }

  closeStream() {
    this.writeStream.end();
  }
}
