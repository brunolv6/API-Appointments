/*
  Routes
  - Receive requisition
  - Call services
  - Response something
*/

import { Router } from 'express';

import { parseISO } from 'date-fns';

import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';

import AppointmentsRepository from '../repositories/AppointmentsRepository'

import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

// do not need to put /appointments because this route is automatic /appointments
appointmentsRouter.post('/', async (request, response) => {

  try {
    const { provider, date } = request.body;

    // data transformation
    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    // add await because I'm gonna wait a Promise to return
    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider
    })

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

appointmentsRouter.get('/', async (request, response) => {

  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  // sempre que tivermos algum metodo que retorna promise temos que dar um await.
  // .. para nao disparar a proxima linha antes da promise ser resolvida
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
})

export default appointmentsRouter;

// SoC - Separation of Concerns
// DTO - Data transfer Object -> transferir objetos de um arquivo ao outro
// Desestruturação

