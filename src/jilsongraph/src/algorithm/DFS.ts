/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-trailing-spaces */
/* eslint-disable import/no-unresolved */
import Graph from '@jilsongraph/Graph';
import GraphModel from '@jpg/cases/GraphModel';
import { DFSNode } from './usecases/UseDFS';

export default class DFS {
  private time = 0;
  
  visit(graph: GraphModel, startedNodes: DFSNode[], node: DFSNode) {
    node.color = 'g';
    this.time++;
    node.discoveryTime = this.time;

    for (const graphEdge of graph.data) {
      if (graphEdge.firstNodeId === node.id) {
        const actualNodeVistIndex = startedNodes.map((itemNode) => itemNode.id).indexOf(graphEdge.firstNodeId);
        if (startedNodes[actualNodeVistIndex].color === 'w') {
          this.visit(graph, startedNodes, startedNodes[actualNodeVistIndex]);
        }
      }

      if (graphEdge.secondNodeId === node.id) {
        const actualNodeVistIndex = startedNodes.map((itemNode) => itemNode.id).indexOf(graphEdge.secondNodeId);
        if (startedNodes[actualNodeVistIndex].color === 'w') {
          this.visit(graph, startedNodes, startedNodes[actualNodeVistIndex]);
        }
      }
    }

    node.color = 'b';
    this.time++;
    node.nodeFinishedTime = this.time;
  }

  async DFS(edgeName: string) {
    const queryClass = new Graph();

    const graph = await queryClass.find(edgeName);

    const listNode: DFSNode[] = graph.data.flatMap((item) => ([{
      id: item.firstNodeId,
      color: 'w',
      pred: null,
      discoveryTime: 0,
      nodeFinishedTime: 0,
    }, {
      id: item.secondNodeId,
      color: 'w',
      pred: null,
      discoveryTime: 0,
      nodeFinishedTime: 0,
    }]));

    const startedNodes: DFSNode[] = [...new Set(listNode)];

    this.time = 0;
    for (const node of startedNodes) {
      if (node.color === 'w') {
        this.visit(graph, startedNodes, node);
      }
    }
  }
}
