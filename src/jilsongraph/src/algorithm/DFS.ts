/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-trailing-spaces */
/* eslint-disable import/no-unresolved */
import Graph from '@jilsongraph/Graph';
import { GrpahModelWithNodeContent } from '@jpg/cases/GraphModel';
import { DFSNode } from './usecases/UseDFS';

export default class DFS {
  private time = 0;

  visit(graph: GrpahModelWithNodeContent, dfsNodes: DFSNode[], node: DFSNode) {
    node.color = 'g';
    this.time++;
    node.discoveryTime = this.time;

    for (const graphEdge of graph.data) {
      if (graphEdge.firstNode.id === node.id) {
        const actualNodeVistIndex = dfsNodes.map((itemNode) => itemNode.id).indexOf(graphEdge.secondNode.id);
        if (dfsNodes[actualNodeVistIndex].color === 'w') {
          dfsNodes[actualNodeVistIndex].pred.id = node.id;
          dfsNodes[actualNodeVistIndex].pred.predInfo = node.nodeInfo;
          this.visit(graph, dfsNodes, dfsNodes[actualNodeVistIndex]);
        }
      }
    }

    node.color = 'b';
    this.time++;
    node.nodeFinishedTime = this.time;
  }

  async runDFS(edgeName: string) {
    const queryClass = new Graph();

    const graph = await queryClass.findWithNodeData(edgeName);

    const listNode: DFSNode[] = graph.data.flatMap((item) => ([{
      id: item.firstNode.id,
      nodeInfo: { ...item.firstNode },
      color: 'w',
      pred: {
        id: null,
        predInfo: {},
      },
      discoveryTime: 0,
      nodeFinishedTime: 0,
    }, {
      id: item.secondNode.id,
      nodeInfo: { ...item.secondNode },
      color: 'w',
      pred: {
        id: null,
        predInfo: {},
      },
      discoveryTime: 0,
      nodeFinishedTime: 0,
    }]));

    const dfsNodes: DFSNode[] = listNode.reduce((acc: DFSNode[], current) => {
      const itemId = acc.find((item) => item.id === current.id);
      if (!itemId) {
        return acc.concat([current]);
      }
      return acc;
    }, []);

    this.time = 0;
    for (const node of dfsNodes) {
      if (node.color === 'w') {
        this.visit(graph, dfsNodes, node);
      }
    }

    return dfsNodes;
  }
}
