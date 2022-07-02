/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-unresolved */
import Graph from '@jilsongraph/Graph';
import { DIJNode } from './usecases/UseDijkstra';

export default class Dijkstra {
  private queue: DIJNode[] = [];

  public comparationValue: string;

  constructor(comparationField: string) {
    this.comparationValue = comparationField;
  }

  getMinimum(dijNodes: DIJNode[]) {
    let minimum = dijNodes[0];
    let minimumIndex = 0;

    let i = 0;
    for (const node of dijNodes) {
      if (node.weight < minimum.weight) {
        minimum = node;
        minimumIndex = i;
      }

      i++;
    }
    this.queue.splice(minimumIndex, 1);
    return minimum;
  }

  relax(u: DIJNode, v: DIJNode, weight: number) {
    if ((u.weight + weight) < v.weight) {
      v.pred = u;
      v.weight = u.weight + weight;
    }
  }

  async dijkstra(edgeName: string, startNodeId: string) {
    const queryClass = new Graph();

    const graph = await queryClass.findWithNodeData(edgeName);

    const dijGraph: DIJNode[] = graph.data.map((item) => ({
      id: item.firstNode.id,
      pred: null,
      weight: 99999,
    }));

    const startNodeIndex = dijGraph.map((node) => node.id).indexOf(startNodeId);
    dijGraph[startNodeIndex].weight = 0;
    for (const item of dijGraph) {
      this.queue.push(item);
    }

    while (this.queue.length > 0) {
      const minimum = this.getMinimum(dijGraph);

      for (const edge of graph.data) {
        if (edge.firstNode.id === minimum.id) {
          const neighborIndex = dijGraph.map((item) => item.id).indexOf(edge.secondNode.id);
          this.relax(minimum, dijGraph[neighborIndex], edge.edgeInfos[this.comparationValue]);
        }
      }
    }

    return dijGraph;
  }
}
