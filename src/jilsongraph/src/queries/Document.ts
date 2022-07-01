/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fsSync from 'fs';
import fs from 'fs/promises';
import path from 'path';

import Catch from '../decorators/Catch';
import CreateFileIfNotExists from '../decorators/CreateFileIfNotExists';
import { makeCreateDocumentError, makeDeleteDocumentError } from '../errors/factory/document';

export default class Document {
  @Catch({ errorFactory: makeCreateDocumentError })
  @CreateFileIfNotExists({ path: path.join(__dirname, '../../database/') })
  async createDocument(docName: string, docType: 'node' | 'edge'): Promise<void> {
    if (!fsSync.existsSync(path.join(__dirname, '../../database/'))) {
      fsSync.mkdirSync(path.join(__dirname, '../../database/'));
      fsSync.mkdirSync(path.join(__dirname, '../../database/node'));
      fsSync.mkdirSync(path.join(__dirname, '../../database/edge'));
    }

    await fs.writeFile(`${path.join(__dirname, `../../database/${docType}/`)}${docName}.json`, JSON.stringify([]));
  }

  @Catch({ errorFactory: makeDeleteDocumentError })
  async destroyDocument(docName: string, docType: 'node' | 'edge'): Promise<void> {
    await fs.unlink(`${path.join(__dirname, `../../database/${docType}/`)}${docName}.json`);
  }
}
