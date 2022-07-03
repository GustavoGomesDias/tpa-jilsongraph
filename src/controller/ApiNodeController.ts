/* eslint-disable import/no-unresolved */
import { Request, Response } from 'express';
import Node from '@jilsongraph/Node';
import ApiNodeModel from 'src/db/model/ApiNodeModel';
import GetNode from 'src/db/usecases/GetNode';
import NotEmpty from '@decorators/NotEmpty';
import Catch from '@decorators/Catch';

export default class ApiNodeController {
  private readonly entity = new Node();

  @Catch()
  async getAllNodes(req: Request, res: Response): Promise<Response> {
    const nodes = await this.entity.getAllNodes();

    return res.status(200).json({ content: nodes });
  }

  @Catch()
  @NotEmpty({
    fields: ['nodeName', 'properties'],
    errorMessages: ['Por favor, de um nome ao nó.', 'O nó não pode ter nenhuma propriedade.'],
  })
  async create(req: Request, res: Response): Promise<Response> {
    const { nodeName, properties } = req.body as ApiNodeModel;

    await this.entity.add(nodeName, properties);

    return res.status(201).json({ message: 'Nó criado com sucesso!' });
  }

  @Catch()
  async getAll(req: Request, res: Response): Promise<Response> {
    const { nodeName } = req.params;

    const node = await this.entity.find(nodeName);

    return res.status(200).json({ content: node });
  }

  @Catch()
  async getById(req: Request, res: Response): Promise<Response> {
    const { nodeName, id } = req.params;
    if (!id) {
      return res.status(404).json({ error: 'Id é requerido.' });
    }

    if (!nodeName) {
      return res.status(404).json({ error: 'Nome do nó é requerido.' });
    }

    const node = await this.entity.findById(nodeName, id);

    return res.status(200).json({ content: node });
  }

  @Catch()
  @NotEmpty({
    fields: ['nodeName', 'properties'],
    errorMessages: ['O nó não pode ter nenhuma propriedade.'],
  })
  async update(req: Request, res: Response): Promise<Response> {
    const { nodeName, properties } = req.body as ApiNodeModel;

    await this.entity.edit(nodeName, properties);

    return res.status(200).json({ message: 'Nó criado com sucesso!' });
  }

  @Catch()
  @NotEmpty({
    fields: ['nodeName', 'id'],
    errorMessages: ['Nome do nó é requerido', 'Id é requerido'],
  })
  async delete(req: Request, res: Response): Promise<Response> {
    const { id, nodeName } = req.body as GetNode;

    await this.entity.delete(nodeName, id);

    return res.status(200).json({ message: 'Nó deletado com sucesso!' });
  }
}
