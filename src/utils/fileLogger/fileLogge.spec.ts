import { FileLogger } from './fileLogger';
import * as fs from 'fs';
import * as path from 'path';

jest.mock('fs');
jest.mock('path');

describe('FileLogger', () => {
  let fileLogger: FileLogger;
  let mockWriteStream: any;

  beforeEach(() => {
    mockWriteStream = {
      write: jest.fn(),
      end: jest.fn(),
    };

    jest.spyOn(fs, 'createWriteStream').mockReturnValue(mockWriteStream as any);
    jest.spyOn(path, 'join').mockReturnValue('mocked/path/application.log');

    fileLogger = new FileLogger('TestContext');
  });

  it('should create a FileLogger instance', () => {
    expect(fileLogger).toBeDefined();
  });

  it('should write log messages to a file', () => {
    const message = 'Test log message';
    fileLogger.log(message);
    expect(mockWriteStream.write).toHaveBeenCalledWith(`Log: ${message}\n`);
  });

  it('should write error messages to a file', () => {
    const message = 'Test error message';
    const trace = 'Test trace';
    fileLogger.error(message, trace);
    expect(mockWriteStream.write).toHaveBeenCalledWith(
      `Error: ${message}\nTrace: ${trace}\n`
    );
  });

  it('should close the write stream', () => {
    fileLogger.closeStream();
    expect(mockWriteStream.end).toHaveBeenCalled();
  });
});
