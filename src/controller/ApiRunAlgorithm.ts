/* eslint-disable import/no-unresolved */
import Algorithms from '@jilsongraph/Algorithms';
import NotEmpty from '@decorators/NotEmpty';
import Catch from '@decorators/Catch';
import { Request, Response } from 'express';

export default class ApiRunAlgorithm {
  private readonly entity = new Algorithms();

  @Catch()
  @NotEmpty({
    fields: ['edgeName'],
    errorMessages: ['É preciso passar um nome para achar o grafo que será usado.'],
  })
  async dfs(req: Request, res: Response): Promise<Response> {
    const { edgeName } = req.body;

    const result = await this.entity.runDFS(edgeName);

    return res.status(200).json({ content: result });
  }

  @Catch()
  @NotEmpty({
    fields: ['edgeName', 'startId'],
    errorMessages: ['É preciso passar um nome para achar o grafo que será usado.', 'É preciso passar o id do nó inicial.'],
  })
  async bfs(req: Request, res: Response): Promise<Response> {
    const { edgeName, startId } = req.body;

    const result = await this.entity.runBFS(edgeName, startId);

    return res.status(200).json({ content: result });
  }

  @Catch()
  @NotEmpty({
    fields: ['edgeName', 'startId', 'comparationField'],
    errorMessages: ['É preciso passar um nome para achar o grafo que será usado.', 'É preciso passar o id do nó inicial.', 'É preciso passar o campo de comparação.'],
  })
  async dijkstra(req: Request, res: Response): Promise<Response> {
    const { edgeName, startId, comparationField } = req.body;

    const result = await this.entity.runDijkstra(edgeName, startId, comparationField);

    return res.status(200).json({ content: result });
  }

  @Catch()
  @NotEmpty({
    fields: ['edgeName', 'startId', 'comparationField'],
    errorMessages: ['É preciso passar um nome para achar o grafo que será usado.', 'É preciso passar o id do nó inicial.', 'É preciso passar o campo de comparação.'],
  })
  async prim(req: Request, res: Response): Promise<Response> {
    const { edgeName, startId, comparationField } = req.body;

    const result = await this.entity.runPrim(edgeName, startId, comparationField);

    return res.status(200).json({ content: result });
  }
}
