/* eslint-disable import/no-unresolved */
/* eslint-disable no-return-await */
/* eslint-disable no-restricted-syntax */
import { CreateEdgeError } from '@jpg/errors/Edge';
import { validationField } from '../../../utils/validations';

/* eslint-disable no-param-reassign */
export interface IsFieldValidProps {
  fields: string[]
  errorMessages: string[]
}

const NotEmptyEdge = ({ fields, errorMessages }: IsFieldValidProps) => (target: any, key: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    const entites = args[0];
    let messagePosition = 0;
    for (const field of fields) {
      if (!validationField(entites[field])) {
        throw new CreateEdgeError(errorMessages[messagePosition], '');
      }

      messagePosition++;
    }
    return await originalMethod.apply(this, args);
  };

  return descriptor;
};

export default NotEmptyEdge;
