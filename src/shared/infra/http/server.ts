import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import AppError from '../../errors/AppError'

import routes from './routes';
import '../database';
import uploadConfig from '../../config/upload'
import '../../container';

const app = express();

app.use(express.json());
// ver arquivo em uma url
app.use('/files', express.static(uploadConfig.directory));

// server use routes built
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
});

app.listen(3333, () =>{
  console.log('Server working in port 3333');
});
