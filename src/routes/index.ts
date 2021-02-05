import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

// definition of router of each route
routes.use('/appointments', appointmentsRouter);

export default routes;
