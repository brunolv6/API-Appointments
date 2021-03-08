/*
  Routes
  - Receive requisition
  - Call services
  - Response something
*/

import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository'
import CreateAppointmentService from '../../../services/CreateAppointmentService';
import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

// para usar as rotas abaixo, este deve pasaar pelo middleware de autenticação
appointmentsRouter.use(ensureAuthenticated);

// route to try to create appointment based on data received as params
appointmentsRouter.post('/', async (request, response) => {

  const { provider_id, date } = request.body;

  // data transformation
  const parsedDate = parseISO(date);

  const appointmentsRepository = new AppointmentsRepository();

  // service to create appointment
  const createAppointment = new CreateAppointmentService(appointmentsRepository);

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id
  })

  return response.json(appointment);

})

// route to get data of appointments on AppointmentRepository table of Database
// appointmentsRouter.get('/', async (request, response) => {
//   console.log(request.user);

//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// })

export default appointmentsRouter;

// SoC - Separation of Concerns
// DTO - Data transfer Object -> transferir objetos de um arquivo ao outro
// Desestruturação

