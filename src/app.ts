import express, { Express } from 'express';
import docRoute from './routes/document';
import nodeRoute from './routes/node';

const app: Express = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/doc', docRoute);
app.use('/node', nodeRoute);

export default app;
