/* eslint-disable import/no-unresolved */
import { Request, Response } from 'express';
import Node from '@jilsongraph/Node';
import ApiNodeModel from 'src/model/ApiNodeModel';

export default class ApiNodeController {
  private readonly entity = new Node();

  async create(req: Request, res: Response): Promise<Response> {
    const { name, properties } = req.body as ApiNodeModel;

    if (!name) {
      return res.status(400).json({ error: 'É preciso passar um nome para a criação de um nó ou aresta.' });
    }

    await this.entity.add(name, properties);

    return res.status(200).json({ message: 'Nó criado com sucesso!' });
  }
}
