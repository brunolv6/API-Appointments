import 'reflect-metadata';
import express from 'express';

import routes from './routes';
import './database';

const app = express();

app.use(express.json());

// server use routes built
app.use(routes);

app.listen(3333, () =>{
  console.log('Server working in port 3333');
});
