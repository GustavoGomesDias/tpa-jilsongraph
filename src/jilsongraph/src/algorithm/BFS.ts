/* eslint-disable import/no-unresolved */
import Graph from '@jilsongraph/Graph';
import { BFSNode } from './usecases/UseBFS';

export default class BFS {
  async runBFS(edgeName: string) {
    const queryClass = new Graph();

    const graph = await queryClass.find(edgeName);

    const listNode: BFSNode[] = graph.data.flatMap((item) => ([{
      id: item.firstNodeId,
      color: 'w',
      pred: null,
    }, {
      id: item.secondNodeId,
      color: 'w',
      pred: null,
    }]));

    const bfsNodes: BFSNode[] = [...new Set(listNode)];
    // visita

    return bfsNodes;
  }
}
