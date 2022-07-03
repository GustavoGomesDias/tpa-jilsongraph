/* eslint-disable import/no-unresolved */
import Catch from '@decorators/Catch';
import NotEmpty from '@decorators/NotEmpty';
import Graph from '@jilsongraph/Graph';
import { AddEdge } from '@jpg/cases/GraphModel';
import { Request, Response } from 'express';

export default class ApiEdgeController {
  private readonly entity = new Graph();

  @Catch()
  async getAllEdges(req: Request, res: Response): Promise<Response> {
    const edges = await this.entity.getAllEdges();

    return res.status(200).json({ content: edges });
  }

  @Catch()
  async getAll(req: Request, res: Response): Promise<Response> {
    const { edge } = req.params;

    if (!edge) {
      return res.status(400).json({ error: 'É preciso passar o nome da relação.' });
    }

    const edges = await this.entity.find(edge);

    return res.status(200).json({ content: edges });
  }

  async getAllWitNodeInfo(req: Request, res: Response): Promise<Response> {
    const { edge } = req.params;

    if (!edge) {
      return res.status(400).json({ error: 'É preciso passar o nome da relação.' });
    }

    const edges = await this.entity.findWithNodeData(edge);

    return res.status(200).json({ content: edges });
  }

  @Catch()
  @NotEmpty({
    fields: ['edgeName', 'firstNodeName', 'secondNodeName', 'directed'],
    errorMessages: [
      'É preciso passar um nome para a aresta.',
      'É preciso passar o nome do primeiro nó que você quer usar.',
      'É preciso passar o nome do primeiro nó que você quer usar.',
      'É preciso dizer se o grafo é ou não direcionado.',
    ],
  })
  async createEmptyEdge(req: Request, res: Response): Promise<Response> {
    const properties = req.body;

    await this.entity.createEdge(properties);

    return res.status(201).json({ message: 'Aresta criada com sucesso!' });
  }

  @Catch()
  @NotEmpty({
    fields: ['firstNodeId', 'secondNodeId'],
    errorMessages: ['Necessário passar os nós.', 'Necessário passar os nós.'],
  })
  async addInEdge(req: Request, res: Response): Promise<Response> {
    const { edgeName } = req.params;
    const properties = req.body as AddEdge;

    if (Array.isArray(properties)) {
      await this.entity.addInEdge(edgeName, properties);
    } else {
      await this.entity.addInEdge(edgeName, [properties]);
    }

    return res.status(201).json({ message: 'Aresta adicionada com sucesso!' });
  }

  @Catch()
  @NotEmpty({
    fields: ['edgeName', 'id'],
    errorMessages: ['Necessário passar o nome da relação.', 'Necessário passar o id da aresta.'],
  })
  async delete(req: Request, res: Response): Promise<Response> {
    const { edgeName, id } = req.body;

    await this.entity.delete(edgeName, id);

    return res.status(201).json({ message: 'Aresta removida com sucesso!' });
  }
}
