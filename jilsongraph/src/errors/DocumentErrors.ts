/* eslint-disable max-classes-per-file */
/* eslint-disable import/export */
import JilsonGraphError from './JilsoGraphError';

export class CreateDocumentError extends JilsonGraphError {
  constructor(message: string) {
    super(`Erro de criação do documento: ${message}`);
    this.name = 'CreateDocumentError';
  }
}

export class DeleteDocumentError extends JilsonGraphError {
  constructor(message: string) {
    super(`Erro de deleção do documento: ${message}`);
    this.name = 'DeleteDocumentError';
  }
}
