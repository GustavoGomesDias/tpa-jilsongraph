/* eslint-disable no-return-await */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import fsSync from 'fs';
import { FileError } from '../errors/JilsoGraphError';

export interface CreateFileIfNotExistsProps {
  path: string,
}

const CreateFileIfNotExists = ({ path }: CreateFileIfNotExistsProps) => (target: any, key: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any) {
    if (fsSync.existsSync(`${path}/${args[1]}/${args[0]}.json`)) {
      // throw new FileError(`Já existe ${args[1] === 'node' ? 'algum nó' : 'alguma aresta'} com este nome.`);
    }
    return await originalMethod.apply(this, args);
  };

  return descriptor;
};

export default CreateFileIfNotExists;
