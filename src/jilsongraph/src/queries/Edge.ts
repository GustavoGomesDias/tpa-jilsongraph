/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuid } from 'uuid';

import Catch from '../decorators/Catch';
import FileExists from '../decorators/FileExists';
import {
  makeCreateEdgeError, makeDeleteEdgeError, makeFindEdgeError, makeUpdateEdgeError,
} from '../errors/factory/edge';
import EdgeModel, { AddEdge, EdgeInfo, EdgeModelWithNodeContent } from '../model/EdgeModel';
import Node from './Node';

export default class Edge {
  public readonly node: Node;

  constructor() {
    this.node = new Node();
  }

  @Catch({ errorFactory: makeFindEdgeError })
  @FileExists({ path: path.join(__dirname, '../../database/edge/'), message: 'Aresta não existe.' })
  async find(edge: string): Promise<EdgeModel> {
    const edgeItems: EdgeModel = JSON.parse(
      await fs.readFile(`${path.join(__dirname, '../../database/edge/')}${edge}.json`, 'utf8'),
    );
    return edgeItems;
  }

  getNodeIndexById(node: Record<any, any>[], id: string): number {
    const itemIndex = node.map((item) => item.id).indexOf(id);

    return itemIndex;
  }

  @Catch({ errorFactory: makeFindEdgeError })
  @FileExists({ path: path.join(__dirname, '../../database/edge/'), message: 'Aresta não existe.' })
  async findWithNodeData(edgeName: string): Promise<Record<any, any>> {
    const edge: EdgeModel = JSON.parse(
      await fs.readFile(`${path.join(__dirname, '../../database/edge/')}${edgeName}.json`, 'utf8'),
    );

    if (edge.data.length <= 0) {
      return [];
    }

    const firstNode = await this.node.find(edge.firstNodeName);
    const secondNode = await this.node.find(edge.secomdNodeName);

    const {
      id, directed, firstNodeName, secomdNodeName,
    } = edge;
    const edgeItemsWithNodeContent: EdgeModelWithNodeContent = {
      id,
      directed,
      firstNodeName,
      secomdNodeName,
      data: edge.data.map((item) => ({
        id: item.id,
        edgeInfos: item.edgeInfos,
        firstNode: firstNode[this.getNodeIndexById(firstNode, item.firstNodeId)],
        secondNode: secondNode[this.getNodeIndexById(secondNode, item.secondNodeId)],
      })),
    };

    return edgeItemsWithNodeContent;
  }

  @Catch({ errorFactory: makeCreateEdgeError })
  @FileExists({ path: path.join(__dirname, '../../database/edge/'), message: 'Aresta não existe.' })
  async add(edgeName: string, edgeProperty: AddEdge[]): Promise<void> {
    const edge = await this.find(edgeName);
    edgeProperty.map((item) => ({
      id: uuid(),
      ...item,
    }));

    for (const item of edgeProperty) {
      edge.data.push(item as EdgeInfo);
    }
    await fs.writeFile(`${path.join(__dirname, '../../database/edge/')}${edgeName}.json`, JSON.stringify(edge));
  }

  @Catch({ errorFactory: makeUpdateEdgeError })
  @FileExists({ path: path.join(__dirname, '../../database/edge/'), message: 'Aresta não existe.' })
  async edit(edgeName: string, edgeProperties: EdgeInfo) {
    const edge = await this.find(edgeName);

    const index = edge.data.map((item) => item.id).indexOf(edgeProperties.id);

    if (edgeProperties.firstNodeId) edge.data[index].firstNodeId = edgeProperties.firstNodeId;
    if (edgeProperties.secondNodeId) edge.data[index].secondNodeId = edgeProperties.secondNodeId;
    if (edgeProperties.edgeInfos) edge.data[index].edgeInfos = edgeProperties.edgeInfos;

    await fs.writeFile(`${path.join(__dirname, '../../database/edge/')}${edgeName}.json`, JSON.stringify(edge));
  }

  @Catch({ errorFactory: makeDeleteEdgeError })
  @FileExists({ path: path.join(__dirname, '../../database/edge/'), message: 'Aresta não existe.' })
  async delete(edgeName: string, id: string) {
    const edge = await this.find(edgeName);

    const itemIndex = edge.data.map((item) => item.id).indexOf(id);

    if (itemIndex >= 0) {
      edge.data.splice(itemIndex, 1);
    }

    await fs.writeFile(`${path.join(__dirname, '../../database/edge/')}${edgeName}.json`, JSON.stringify(edge));
  }
}