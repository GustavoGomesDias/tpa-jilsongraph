/* eslint-disable max-classes-per-file */
import JilsonGraphError from './JilsoGraphError';

export class CreateEdgeError extends JilsonGraphError {
  constructor(message: string, entityName: string) {
    super(`Erro de criação do relacionamento ${entityName ? `[${entityName}]` : ''}: ${message}.`);

    this.name = 'CreateEdgeError';
  }
}

export class FindEdgeError extends JilsonGraphError {
  constructor(message: string, entityName: string) {
    super(`Erro de busca do relacionamento [${entityName}]: ${message}`);

    this.name = 'FindEdgeError';
  }
}

export class UpdateEdgeError extends JilsonGraphError {
  constructor(message: string, entityName: string) {
    super(`Erro de atualização do relacionamento [${entityName}]: ${message}`);

    this.name = 'UpdateEdgeError';
  }
}

export class DeleteEdgeError extends JilsonGraphError {
  constructor(message: string, entityName: string) {
    super(`Erro de deleção do relacionamento [${entityName}]: ${message}`);

    this.name = 'DeleteEdgeError';
  }
}
