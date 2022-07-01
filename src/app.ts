/* eslint-disable import/first */
import dotenv from 'dotenv';

dotenv.config();

import express, { Express } from 'express';
import cors from 'cors';
import docRoute from './routes/document';
import appRoute from './routes/app';
import nodeRoute from './routes/node';
import edgeRoute from './routes/edge';

// const whitelist = ['http://example1.com', 'http://example2.com'];
const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
  preflightContinue: false,
};

const app: Express = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(options));

// Routes
app.use('/', appRoute);
app.use('/doc', docRoute);
app.use('/node', nodeRoute);
app.use('/edge', edgeRoute);

export default app;
