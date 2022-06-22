/* eslint-disable import/no-unresolved */
import { Request, Response } from 'express';
import Document from '@jilsongraph/Document';
import NotEmpty from '@decorators/NotEmpty';
import Catch from '@decorators/Catch';
import ApiDocumentModel from '../db/model/ApiDocumentModel';

export default class ApiDocumentController {
  private readonly entity = new Document();

  @Catch()
  @NotEmpty({
    fields: ['name'],
    errorMessages: ['É preciso passar um nome para a criação de um nó ou aresta.'],
  })
  async create(req: Request, res: Response): Promise<Response> {
    const { name, type } = req.body as ApiDocumentModel;

    await this.entity.createDocument(name, type);

    return res.status(201).json({ message: `${type === 'node' ? 'Nó' : 'Aresta'} criado com sucesso!` });
  }

  @Catch()
  @NotEmpty({
    fields: ['name'],
    errorMessages: ['É preciso passar um nome para a deleção de um nó ou aresta.'],
  })
  async delete(req: Request, res: Response): Promise<Response> {
    const { name, type } = req.body as ApiDocumentModel;

    await this.entity.destroyDocument(name, type);

    return res.status(200).json({ message: `${type === 'node' ? 'Nó' : 'Aresta'} deletado com sucesso!` });
  }
}
