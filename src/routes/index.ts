import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

import usersRouter from './users.routes';

const routes = Router();

// definition of router of each route
routes.use('/appointments', appointmentsRouter);

routes.use('/users',  usersRouter);

export default routes;
