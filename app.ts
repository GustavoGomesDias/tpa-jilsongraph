import express, { Express } from 'express';
import docRoute from './src/routes/document';

const app: Express = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/doc', docRoute);

export default app;
