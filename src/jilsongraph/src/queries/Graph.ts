/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuid } from 'uuid';

import Catch from '../decorators/Catch';
import FileExists from '../decorators/FileExists';
import NotEmptyEdge from '../decorators/NotEmptyEdge';
import {
  makeCreateEdgeError, makeDeleteEdgeError, makeFindEdgeError, makeUpdateEdgeError,
} from '../errors/factory/edge';
import GraphModel, {
  AddEdge, CreateEmptyEdge, EdgeInfo, GrpahModelWithNodeContent,
} from '../model/GraphModel';
import Node from './Node';

export default class Graph {
  public readonly node: Node;

  constructor() {
    this.node = new Node();
  }

  // @Catch({ errorFactory: makeFindEdgeError })
  async getAllEdges() {
    try {
      const edges = await fs.readdir(path.join(__dirname, '../../database/edge/'));

      return edges;
    } catch (err) {
      return [];
    }
  }

  @Catch({ errorFactory: makeFindEdgeError })
  @FileExists({ path: path.join(__dirname, '../../database/edge/'), message: 'Aresta não existe.' })
  async find(edge: string): Promise<GraphModel> {
    const edgeItems: GraphModel = JSON.parse(
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
  async findWithNodeData(edgeName: string): Promise<GrpahModelWithNodeContent> {
    const edge: GraphModel = JSON.parse(
      await fs.readFile(`${path.join(__dirname, '../../database/edge/')}${edgeName}.json`, 'utf8'),
    );

    if (edge.data.length <= 0) {
      throw new Error('Nenhum item encontrado.');
    }

    const firstNode = await this.node.find(edge.firstNodeName);
    const secondNode = await this.node.find(edge.secondNodeName);

    const {
      id, directed, firstNodeName, secondNodeName,
    } = edge;
    const edgeItemsWithNodeContent: GrpahModelWithNodeContent = {
      id,
      directed,
      firstNodeName,
      secondNodeName,
      data: edge.data.map((item) => ({
        edgeInfo: item.edgeInfos,
        id: item.id,
        edgeInfos: item.edgeInfos,
        firstNode: firstNode[this.getNodeIndexById(firstNode, item.firstNodeId)],
        secondNode: secondNode[this.getNodeIndexById(secondNode, item.secondNodeId)],
      })),
    };

    return edgeItemsWithNodeContent;
  }

  @Catch({ errorFactory: makeCreateEdgeError })
  @NotEmptyEdge({
    fields: ['edgeName', 'firstNodeName', 'secondNodeName', 'directed'],
    errorMessages: [
      'É preciso passar um nome para a aresta.',
      'É preciso passar o nome do primeiro nó que você quer usar.',
      'É preciso passar o nome do primeiro nó que você quer usar.',
      'É preciso dizer se o grafo é ou não direcionado.',
    ],
  })
  async createEdge(edgeProperty: CreateEmptyEdge): Promise<void> {
    edgeProperty.data = [];
    await fs.writeFile(`${path.join(__dirname, '../../database/edge/')}${edgeProperty.edgeName}.json`, JSON.stringify(edgeProperty));
  }

  @Catch({ errorFactory: makeCreateEdgeError })
  @FileExists({ path: path.join(__dirname, '../../database/edge/'), message: 'Aresta não existe.' })
  async addInEdge(edgeName: string, edgeProperty: AddEdge[]): Promise<void> {
    const edge = await this.find(edgeName);

    for (const item of edgeProperty) {
      (item as EdgeInfo).id = uuid();
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
