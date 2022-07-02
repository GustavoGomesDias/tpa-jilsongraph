/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-unresolved */
import Graph from '@jilsongraph/Graph';
import { DIJNode } from './usecases/UseDijkstra';

export default class Prim {
  comparationValue: string;

  constructor(comparationField: string) {
    this.comparationValue = comparationField;
  }

  getMin(queue: DIJNode[]) {
    let minimum = queue[0];

    for (const edge of queue) {
      if (minimum.weight > edge.weight) {
        minimum = edge;
      }
    }

    return minimum;
  }

  async prim(edgeName: string, startNodeId: string) {
    const queryClass = new Graph();

    const graph = await queryClass.findWithNodeData(edgeName);

    const dijGraph: DIJNode[] = graph.data.map((item) => ({
      id: item.firstNode.id,
      pred: null,
      weight: 99999,
    }));

    const startNodeIndex = dijGraph.map((node) => node.id).indexOf(startNodeId);
    dijGraph[startNodeIndex].weight = 0;
    const queue = dijGraph.map((item) => item);

    while (queue.length > 0) {
      const node = this.getMin(queue);

      for (const edge of graph.data) {
        if (edge.firstNode.id === node.id) {
          const nodeInQueueIndex = queue.map((item) => item.id).indexOf(edge.secondNode.id);
          const nodeInDijGraphIndex = dijGraph.map((item) => item.id).indexOf(edge.secondNode.id);
          if (nodeInQueueIndex > -1 && edge.edgeInfos[this.comparationValue] < dijGraph[nodeInDijGraphIndex]) {
            dijGraph[nodeInDijGraphIndex].pred = node;
            dijGraph[nodeInDijGraphIndex].weight = edge.edgeInfos[this.comparationValue];
          }
        }
      }
    }

    return dijGraph;
  }
}
