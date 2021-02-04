// src/routes/index.ts
import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

// use funciona para qualquer rota get, post or other
routes.use('/appointments', appointmentsRouter);

export default routes;
