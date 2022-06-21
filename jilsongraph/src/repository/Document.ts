/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs/promises';
import path from 'path';

import Catch from '../decorators/Catch';
import { makeCreateDocumentError, makeFindDocumentError, makeUpdateDocumentError } from '../errors/factory/document';
import DocumentModel from '../model/Document';

export interface QueryOptions {
  orderBy?: 'DESC' | 'ASC'
  sortField: string
}

export default class Document {
  @Catch({ errorFactory: makeCreateDocumentError })
  async createDocument(infos: DocumentModel): Promise<void> {
    await fs.writeFile(`${path.join(__dirname, '../../')}${infos.name}.json`, JSON.stringify([]));
  }

  @Catch({ errorFactory: makeFindDocumentError })
  async find(entityName: string): Promise<Record<any, any>[]> {
    const entityItems: Record<any, any>[] = JSON.parse(
      await fs.readFile(`${path.join(__dirname, '../../')}${entityName}.json`, 'utf8'),
    );
    return entityItems;
  }

  @Catch({ errorFactory: makeFindDocumentError })
  async findById(entityName: string, id: string): Promise<Record<any, any>> {
    const entityItems: Record<any, any>[] = JSON.parse(
      await fs.readFile(`${path.join(__dirname, '../../')}${entityName}.json`, 'utf8'),
    );

    if (entityItems.length <= 0) {
      return [];
    }

    const entityItem = entityItems.filter((item) => item.id === id);

    return entityItem;
  }

  @Catch({ errorFactory: makeCreateDocumentError })
  async add(entityName: string, itemProperties: Record<any, any>): Promise<void> {
    const entityItems = await this.find(entityName);
    if (!itemProperties.relations) {
      itemProperties.relations = [];
    }

    entityItems.push(itemProperties);
    await fs.writeFile(`${path.join(__dirname, '../../')}${entityName}.json`, JSON.stringify(entityItems));
  }

  @Catch({ errorFactory: makeUpdateDocumentError })
  async edit(entityName: string, itemProperties: Record<any, any>) {
    const entityItems = await this.find(entityName);

    const itemIndex = entityItems.map((item) => item.id).indexOf(itemProperties.id);

    for (const key of Object.keys(itemProperties)) {
      entityItems[itemIndex][key] = itemProperties[key];
    }

    await fs.writeFile(`${path.join(__dirname, '../../')}${entityName}.json`, JSON.stringify(entityItems));
  }
}
