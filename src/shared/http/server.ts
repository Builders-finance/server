import 'reflect-metadata';
import 'dotenv/config';
import uploaConfig from '@config/upload';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import {errors} from 'celebrate';
// import {pagination} from 'typeorm-pagination';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/container';
import '@shared/typeorm';
import { PassThrough } from 'node:stream';


const app = express();
app.use(cors());
app.use(express.json());
// app.use(pagination);
app.use('/files', express.static(uploaConfig.directory));
app.use(routes);
app.use(errors());

//Error middleware
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  console.log('ERRO EXT',error);
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
