/*
  Routes
  - Receive requisition
  - Call services
  - Response something
*/

import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

// para usar as rotas abaixo, este deve pasaar pelo middleware de autenticação
appointmentsRouter.use(ensureAuthenticated);

// route to try to create appointment based on data received as params
appointmentsRouter.post('/', async (request, response) => {

  const { provider_id, date } = request.body;

  // data transformation
  const parsedDate = parseISO(date);

  // service to create appointment
  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id
  })

  return response.json(appointment);

})

// route to get data of appointments on AppointmentRepository table of Database
appointmentsRouter.get('/', async (request, response) => {
  console.log(request.user);

  // search for data on repository (should this be a separate service? SoC?)
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
})

export default appointmentsRouter;

// SoC - Separation of Concerns
// DTO - Data transfer Object -> transferir objetos de um arquivo ao outro
// Desestruturação

