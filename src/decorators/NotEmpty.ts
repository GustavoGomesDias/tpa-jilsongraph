/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable no-return-await */

import { Request } from 'express';
import BadRequestErr from '../errors/BadRequestError';
import { validationField } from '../utils/validations';

/* eslint-disable no-param-reassign */
export interface IsFieldValidProps {
  fields: string[]
  errorMessages: string[]
}

const NotEmpty = ({ fields, errorMessages }: IsFieldValidProps) => (target: any, key: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    const { body, params } = args[0] as Request;
    console.log(params);
    let messagePosition = 0;
    for (const field of fields) {
      if (!validationField(body[field])) {
        throw new BadRequestErr(errorMessages[messagePosition]);
      }

      messagePosition++;
    }
    return await originalMethod.apply(this, args);
  };

  return descriptor;
};

export default NotEmpty;
