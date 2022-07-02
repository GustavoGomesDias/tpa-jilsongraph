/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-unresolved */
import Graph from '@jilsongraph/Graph';
import GraphModel from '@jpg/cases/GraphModel';
import { BFSNode } from './usecases/UseBFS';

export default class BFS {
  visit(graph: GraphModel, bfsNodes: BFSNode[], node: BFSNode, visiteds: BFSNode[], founds: BFSNode[], queue: BFSNode[]) {
    for (const neighbor of graph.data) {
      if (neighbor.firstNodeId === node.id) {
        const actualNodeVisitIndex = bfsNodes.map((itemNode) => itemNode.id).indexOf(neighbor.firstNodeId);
        const actualNode = bfsNodes[actualNodeVisitIndex];
        const visitedsIndex = visiteds.map((item) => item.id);
        const foundsIndex = founds.map((item) => item.id);

        if (visitedsIndex.indexOf(actualNode.id) < 0 && foundsIndex.indexOf(actualNode.id) < 0) {
          bfsNodes[actualNodeVisitIndex].color = 'g';
          bfsNodes[actualNodeVisitIndex].pred = node.id;
          founds.push(actualNode);
          queue.push(actualNode);
        }
      }

      if (neighbor.secondNodeId === node.id) {
        const actualNodeVisitIndex = bfsNodes.map((itemNode) => itemNode.id).indexOf(neighbor.firstNodeId);
        const actualNode = bfsNodes[actualNodeVisitIndex];
        const visitedsIndex = visiteds.map((item) => item.id);
        const foundsIndex = founds.map((item) => item.id);

        if (visitedsIndex.indexOf(actualNode.id) < 0 && foundsIndex.indexOf(actualNode.id) < 0) {
          bfsNodes[actualNodeVisitIndex].color = 'g';
          bfsNodes[actualNodeVisitIndex].pred = node.id;
          founds.push(actualNode);
          queue.push(actualNode);
        }
      }

      node.color = 'b';
    }
  }

  async runBFS(edgeName: string, startId: string) {
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
    const startNodeIndex: number = bfsNodes.map((item) => item.id).indexOf(startId);
    const startNode: BFSNode = bfsNodes[startNodeIndex];
    const queue: BFSNode[] = [];
    const visiteds: BFSNode[] = [];
    const founds: BFSNode[] = [];
    queue.push(startNode);
    founds.push(startNode);
    while (queue.length > 0) {
      const node: BFSNode = queue.shift() as BFSNode;
      this.visit(graph, bfsNodes, node, visiteds, founds, queue);
      visiteds.push(node);
    }

    return bfsNodes;
  }
}
