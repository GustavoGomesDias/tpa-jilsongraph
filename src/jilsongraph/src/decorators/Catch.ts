/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */

import { JilsonGrapgErrorFactory } from '../errors/factory';

export interface CatchProps {
  errorFactory: JilsonGrapgErrorFactory
}

const Catch = ({ errorFactory }: CatchProps) => (target: any, key: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any) {
    try {
      return await originalMethod.apply(this, args);
    } catch (err) {
      if (args.length > 1) {
        const error = errorFactory((err as Error).message, args[1] || '-');
        throw error;
      }
      const error = errorFactory((err as Error).message);
      throw error;
    }
  };

  return descriptor;
};

export default Catch;
