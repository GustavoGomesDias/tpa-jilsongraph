import { CreateDocumentError, DeleteDocumentError } from '../document/DocumentErrors';

export const makeCreateDocumentError = (messageErr: string) => new CreateDocumentError(messageErr);
export const makeDeleteDocumentError = (messageErr: string) => new DeleteDocumentError(messageErr);
