/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs/promises';
import path from 'path';

import Catch from '../decorators/Catch';
import { makeCreateDocumentError, makeDeleteDocumentError } from '../errors/factory/Document';

export default class Document {
  @Catch({ errorFactory: makeCreateDocumentError })
  async createDocument(docName: string): Promise<void> {
    await fs.writeFile(`${path.join(__dirname, '../../')}${docName}.json`, JSON.stringify([]));
  }

  @Catch({ errorFactory: makeDeleteDocumentError })
  async destroyDocument(docName: string): Promise<void> {
    await fs.unlink(`${path.join(__dirname, '../../')}${docName}.json`);
  }
}
