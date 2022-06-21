import { CreateDocumentError, FindDocumentError, UpdateDocumentError } from '../document/DocumentError';

export const makeCreateDocumentError = (messageErr: string, entityName: string) => new CreateDocumentError(messageErr, entityName);
export const makeFindDocumentError = (messageErr: string, entityName: string) => new FindDocumentError(messageErr, entityName);
export const makeUpdateDocumentError = (messageErr: string, entityName: string) => new UpdateDocumentError(messageErr, entityName);
