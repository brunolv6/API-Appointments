import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import sessionsRoutes from './sessions.routes';

import usersRouter from './users.routes';

const routes = Router();

// definition of router of each route
routes.use('/appointments', appointmentsRouter);

routes.use('/users',  usersRouter);

routes.use('/sessions',  sessionsRoutes);

export default routes;
