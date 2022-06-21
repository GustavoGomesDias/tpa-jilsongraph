/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs/promises';
import path from 'path';

import Catch from '../decorators/Catch';
import {
  makeCreateNodeError, makeDeleteNodeError, makeFindNodeError, makeUpdateNodeError,
} from '../errors/factory/Node';

export default class Node {
  @Catch({ errorFactory: makeFindNodeError })
  async find(nodeName: string): Promise<Record<any, any>[]> {
    const nodeItems: Record<any, any>[] = JSON.parse(
      await fs.readFile(`${path.join(__dirname, '../node/')}${nodeName}.json`, 'utf8'),
    );
    return nodeItems;
  }

  @Catch({ errorFactory: makeFindNodeError })
  async findById(nodeName: string, id: string): Promise<Record<any, any>> {
    const nodeItems: Record<any, any>[] = JSON.parse(
      await fs.readFile(`${path.join(__dirname, '../node/')}${nodeName}.json`, 'utf8'),
    );

    if (nodeItems.length <= 0) {
      return [];
    }

    const nodeItem = nodeItems.filter((item) => item.id === id);

    return nodeItem;
  }

  @Catch({ errorFactory: makeCreateNodeError })
  async add(nodeName: string, itemProperties: Record<any, any>): Promise<void> {
    const nodeItems = await this.find(nodeName);
    if (!itemProperties.relations) {
      itemProperties.relations = [];
    }

    nodeItems.push(itemProperties);
    await fs.writeFile(`${path.join(__dirname, '../node/')}${nodeName}.json`, JSON.stringify(nodeItems));
  }

  @Catch({ errorFactory: makeUpdateNodeError })
  async edit(nodeName: string, itemProperties: Record<any, any>) {
    const nodeItems = await this.find(nodeName);

    const itemIndex = nodeItems.map((item) => item.id).indexOf(itemProperties.id);

    for (const key of Object.keys(itemProperties)) {
      nodeItems[itemIndex][key] = itemProperties[key];
    }

    await fs.writeFile(`${path.join(__dirname, '../node/')}${nodeName}.json`, JSON.stringify(nodeItems));
  }

  @Catch({ errorFactory: makeDeleteNodeError })
  async delete(nodeName: string, itemProperties: Record<any, any>) {
    const nodeItems = await this.find(nodeName);

    const itemIndex = nodeItems.map((item) => item.id).indexOf(itemProperties.id);

    if (itemIndex) {
      nodeItems.splice(itemIndex, 1);
    }

    await fs.writeFile(`${path.join(__dirname, '../node/')}${nodeName}.json`, JSON.stringify(nodeItems));
  }
}
