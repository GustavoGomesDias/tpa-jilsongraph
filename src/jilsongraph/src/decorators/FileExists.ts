/* eslint-disable no-return-await */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import fsSync from 'fs';
import { FileError } from '../errors/JilsoGraphError';

export interface FileExistsProps {
  path: string
  message: string
}

const FileExists = ({ path, message }: FileExistsProps) => (target: any, key: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any) {
    if (!fsSync.existsSync(`${path}${args[0]}.json`)) {
      throw new FileError(message);
    }
    return await originalMethod.apply(this, args);
  };

  return descriptor;
};

export default FileExists;
