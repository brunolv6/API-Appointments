import { Router } from 'express';

//Rota: receber requisição, chamar outro arquivo e devolver uma resposta

// startofHour take out minutos and seconds, let oly round hour
// parseISO dat in string to format Date()
import { parseISO } from 'date-fns';

import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';

import AppointmentsRepository from '../repositories/AppointmentsRepository'

import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

// inicializar do objeto que é como se fosse uma banco de dados
// o nome da dconstante pode ser qualquer umas, é apenas um nome (referência do objeto que eu crie na memória)
// se definir com outro nome tudo bem, fazer este teste e trocar na sequencia
// const appointmentsRepository = new AppointmentsRepository();

// need to add tipagem para que o .find indentifique que tipo existiram dentro de appointment variable/object
// feito em models/Appointments

// enquanto não temos consistencia de dados
// estou definindo que esta variavel é do tipo array of Appointment
// (desta forma em teoria se existir uma alocação de memória eu já sei qual o tamanho que necessitaria para alocar esta variável)
// -- definicao de tipo de dado --
// definicao de Appointment é pelo de models/Appointment.ts
// const appointments: Appointment[] = [];
// -- Esta parte ficou sobre responsabilidade do repositories

// do not need to put /appointments because this route is automatic /appointments
appointmentsRouter.post('/', async (request, response) => {

  try {
    const { provider, date } = request.body;

    // transform date of string in Date() object and after that trunca para hora redonda
    // const parsedDate = startOfHour(parseISO(date));
    // transformação de dados
    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    // add await because I'm gonna wait a Promise return
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
  // const appointments = appointmentsRepository.all();
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

