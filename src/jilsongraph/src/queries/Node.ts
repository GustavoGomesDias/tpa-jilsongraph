/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuid } from 'uuid';

import Catch from '../decorators/Catch';
import FileExists from '../decorators/FileExists';
import {
  makeCreateNodeError, makeDeleteNodeError, makeFindNodeError, makeUpdateNodeError,
} from '../errors/factory/node';

export default class Node {
  @Catch({ errorFactory: makeFindNodeError })
  @FileExists({ path: path.join(__dirname, '../../database/node/'), message: 'Nó não existe.' })
  async find(nodeName: string): Promise<Record<any, any>[]> {
    const nodeItems: Record<any, any>[] = JSON.parse(
      await fs.readFile(`${path.join(__dirname, '../../database/node/')}${nodeName}.json`, 'utf8'),
    );
    return nodeItems;
  }

  @Catch({ errorFactory: makeFindNodeError })
  @FileExists({ path: path.join(__dirname, '../../database/node/'), message: 'Nó não existe.' })
  async findById(nodeName: string, id: string): Promise<Record<any, any>> {
    const nodeItems: Record<any, any>[] = JSON.parse(
      await fs.readFile(`${path.join(__dirname, '../../database/node/')}${nodeName}.json`, 'utf8'),
    );

    if (nodeItems.length <= 0) {
      return [];
    }

    const nodeItem = nodeItems.filter((item) => item.id === id);

    return nodeItem;
  }

  @Catch({ errorFactory: makeCreateNodeError })
  @FileExists({ path: path.join(__dirname, '../../database/node/'), message: 'Nó não existe.' })
  async add(nodeName: string, itemProperties: Record<any, any>): Promise<void> {
    const nodeItems = await this.find(nodeName);

    itemProperties.id = uuid();

    nodeItems.push(itemProperties);
    await fs.writeFile(`${path.join(__dirname, '../../database/node/')}${nodeName}.json`, JSON.stringify(nodeItems));
  }

  @Catch({ errorFactory: makeUpdateNodeError })
  @FileExists({ path: path.join(__dirname, '../../database/node/'), message: 'Nó não existe.' })
  async edit(nodeName: string, itemProperties: Record<any, any>) {
    const nodeItems = await this.find(nodeName);

    const itemIndex = nodeItems.map((item) => item.id).indexOf(itemProperties.id);

    for (const key of Object.keys(itemProperties)) {
      nodeItems[itemIndex][key] = itemProperties[key];
    }

    await fs.writeFile(`${path.join(__dirname, '../../database/node/')}${nodeName}.json`, JSON.stringify(nodeItems));
  }

  @Catch({ errorFactory: makeDeleteNodeError })
  @FileExists({ path: path.join(__dirname, '../../database/node/'), message: 'Nó não existe.' })
  async delete(nodeName: string, id: string) {
    const nodeItems = await this.find(nodeName);

    const itemIndex = nodeItems.map((item) => item.id).indexOf(id);

    if (itemIndex >= 0) {
      nodeItems.splice(itemIndex, 1);
    }

    await fs.writeFile(`${path.join(__dirname, '../../database/node/')}${nodeName}.json`, JSON.stringify(nodeItems));
  }
}
