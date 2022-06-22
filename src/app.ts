import express, { Express } from 'express';
import docRoute from './routes/document';
import nodeRoute from './routes/node';
import edgeRoute from './routes/edge';

const app: Express = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/doc', docRoute);
app.use('/node', nodeRoute);
app.use('/edge', edgeRoute);

export default app;
