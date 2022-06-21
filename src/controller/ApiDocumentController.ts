import { Request, Response } from 'express';
// eslint-disable-next-line import/no-unresolved
import Document from '@jilsongraph/Document';
import ApiDocumentModel from '../model/ApiDocumentModel';

export default class ApiDocumentController {
  private readonly entity = new Document();

  async create(req: Request, res: Response): Promise<Response> {
    const { name, type } = req.body as ApiDocumentModel;

    if (!name) {
      return res.status(400).json({ error: 'É preciso passar um nome para a criação de um nó ou aresta.' });
    }

    await this.entity.createDocument(name, type);

    return res.status(200).json({ message: `${type === 'node' ? 'Nó' : 'Aresta'} criado com sucesso!` });
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { name, type } = req.body as ApiDocumentModel;

    if (!name) {
      return res.status(400).json({ error: 'É preciso passar um nome para a deleção de um nó ou aresta.' });
    }

    await this.entity.destroyDocument(name, type);

    return res.status(200).json({ message: `${type === 'node' ? 'Nó' : 'Aresta'} deletado com sucesso!` });
  }
}
