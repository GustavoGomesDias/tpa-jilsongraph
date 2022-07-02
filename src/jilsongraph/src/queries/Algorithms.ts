/* eslint-disable import/no-unresolved */
import { makeAlgorithmError } from '@jpg/errors/factory/algorithm';
import Catch from '../decorators/Catch';
import DFS from '../algorithm/DFS';
import BFS from '../algorithm/BFS';
import Dijkstra from '../algorithm/Dijkstra';
import Prim from '../algorithm/Prim';

export default class Algorithms {
  @Catch({ errorFactory: makeAlgorithmError })
  async runDFS(edgeName: string) {
    const dfs = new DFS();

    const result = await dfs.runDFS(edgeName);

    return result;
  }

  @Catch({ errorFactory: makeAlgorithmError })
  async runBFS(edgeName: string, startId: string) {
    const bfs = new BFS();

    const result = await bfs.runBFS(edgeName, startId);

    return result;
  }

  @Catch({ errorFactory: makeAlgorithmError })
  async runDijkstra(edgeName: string, startNodeId: string, comparationField: string) {
    const dijkstra = new Dijkstra(comparationField);

    const result = await dijkstra.dijkstra(edgeName, startNodeId);

    return result;
  }

  @Catch({ errorFactory: makeAlgorithmError })
  async runPrim(edgeName: string, startNodeId: string, comparationField: string) {
    const prim = new Prim(comparationField);

    const result = await prim.prim(edgeName, startNodeId);

    return result;
  }
}
