//yarn add ts-node-dev -D -> bom para executar .ts projects em node, mas rapido que build em tsc ..

/*
    Add no packjson
    "scripts": {
        "build": "tsc",
        "dev:server": "ts-node-dev --transpileOnly --ignore-watch node_module src/server.ts"
        -> serve para rodar ts ignorando mudancas no node modules (porque não mexemos nestes) e correção de erro (tipagem) fica no vs code e não tem q fazer esta validação
    },
*/

// algo do TypeORM search
import 'reflect-metadata';

import express from 'express';

// src/server.ts
import routes from './routes';

import './database';

const app = express();

app.use(express.json());

app.use(routes);

app.listen(3333, () =>{
  console.log('Server working in port 3333');
});
