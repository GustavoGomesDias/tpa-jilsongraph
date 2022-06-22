import { CreateDocumentError, DeleteDocumentError } from '../DocumentErrors';

export const makeCreateDocumentError = (messageErr: string) => new CreateDocumentError(messageErr);
export const makeDeleteDocumentError = (messageErr: string) => new DeleteDocumentError(messageErr);
