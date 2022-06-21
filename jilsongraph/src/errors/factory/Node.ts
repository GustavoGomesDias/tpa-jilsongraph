import {
  CreateNodeError, DeleteNodeError, FindNodeError, UpdateNodeError,
} from '../NodeErrors';

export const makeCreateNodeError = (messageErr: string, entityName?: string) => new CreateNodeError(messageErr, entityName as string);
export const makeFindNodeError = (messageErr: string, entityName?: string) => new FindNodeError(messageErr, entityName as string);
export const makeUpdateNodeError = (messageErr: string, entityName?: string) => new UpdateNodeError(messageErr, entityName as string);
export const makeDeleteNodeError = (messageErr: string, entityName?: string) => new DeleteNodeError(messageErr, entityName as string);
