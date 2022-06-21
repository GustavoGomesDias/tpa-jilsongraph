/* eslint-disable max-classes-per-file */
import JilsonGraphError from './JilsoGraphError';

export class CreateNodeError extends JilsonGraphError {
  constructor(message: string, entityName: string) {
    super(`Erro de criação do documento [${entityName}]: ${message}`);

    this.name = 'CreateDocumentError';
  }
}

export class FindNodeError extends JilsonGraphError {
  constructor(message: string, entityName: string) {
    super(`Erro na obtenção de dados do documento [${entityName}]: ${message}`);

    this.name = 'FindDocumentError';
  }
}

export class UpdateNodeError extends JilsonGraphError {
  constructor(message: string, entityName: string) {
    super(`Erro na atualização de dados do documento [${entityName}]: ${message}`);

    this.name = 'UpdateDocumentError';
  }
}

export class DeleteNodeError extends JilsonGraphError {
  constructor(message: string, entityName: string) {
    super(`Erro na deleção de dados do documento [${entityName}]: ${message}`);

    this.name = 'DeleteNodeError';
  }
}
