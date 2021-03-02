import { Router } from 'express';
import appointmentsRouter from '../../../../modules/appointments/infra/http/routes/appointments.routes';
import sessionsRoutes from '../../../../modules/users/infra/http/routes/sessions.routes';

import usersRouter from '../../../../modules/users/infra/http/routes/users.routes';

const routes = Router();

// definition of router of each route
routes.use('/appointments', appointmentsRouter);

routes.use('/users',  usersRouter);

routes.use('/sessions',  sessionsRoutes);

export default routes;
