import {
  CreateEdgeError, DeleteEdgeError, FindEdgeError, UpdateEdgeError,
} from '../Edge';

export const makeCreateEdgeError = (messageErr: string, entityName?: string) => new CreateEdgeError(messageErr, entityName as string);
export const makeFindEdgeError = (messageErr: string, entityName?: string) => new FindEdgeError(messageErr, entityName as string);
export const makeUpdateEdgeError = (messageErr: string, entityName?: string) => new UpdateEdgeError(messageErr, entityName as string);
export const makeDeleteEdgeError = (messageErr: string, entityName?: string) => new DeleteEdgeError(messageErr, entityName as string);
