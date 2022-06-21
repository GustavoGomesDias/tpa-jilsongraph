/* eslint-disable max-classes-per-file */
import JilsonGraphError from '../JilsoGraphError';

export class CreateDocumentError extends JilsonGraphError {
  constructor(message: string, entityName: string) {
    super(`Erro de criação do documento [${entityName}]: ${message}`);

    this.name = 'CreateDocumentError';
  }
}

export class FindDocumentError extends JilsonGraphError {
  constructor(message: string, entityName: string) {
    super(`Erro na obtenção de dados do documento [${entityName}]: ${message}`);

    this.name = 'FindDocumentError';
  }
}

export class UpdateDocumentError extends JilsonGraphError {
  constructor(message: string, entityName: string) {
    super(`Erro na atualização de dados do documento [${entityName}]: ${message}`);

    this.name = 'UpdateDocumentError';
  }
}
