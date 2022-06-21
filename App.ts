import express, { Express } from 'express';

class App {
  public readonly app: Express;

  constructor() {
    this.app = express();
    // this.routes();
    this.middlewares();
  }

  middlewares(): void {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  // routes(): void {}
}

export default new App().app;
