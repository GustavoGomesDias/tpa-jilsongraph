/* eslint-disable max-classes-per-file */
/* eslint-disable no-useless-constructor */
export default class JilsonGraphError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class FileError extends Error {
  constructor(message: string) {
    super(message);
  }
}
