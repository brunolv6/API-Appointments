/*
  - Recebimento das infos
  - Tratativa de erros
  - Acesso ao repo
*/

// Exclusivamente responsável pela criação do arquivo neste caso

import Appointment from "../models/Appointment"
import AppointmentsRepository from "../repositories/AppointmentsRepository";

import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {

  public async execute({ provider, date }: Request): Promise<Appointment> {

    // obtem todos os metodos que realizamos em DB
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    // add await otherwise it go to the next line without receive the value of findAppointmnetSameDate
    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

    if(findAppointmentInSameDate){
      throw Error('This appointmet is already booked');
    }

    // utilizando método create definido como publico na classe appointmentsRepository
    // para adicionar appointment na variavel appointments privada do objeto que criei
    // mudanca para envio de objeto ao invés de argumentos porque permite ver o que faltou
    // e não apenas q faltou algum argumento aleatorio
    // parameetros nomeados
    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate
    });

    // só aqui o appointment é adicionado a tabela de Appointments no post gress
    await appointmentsRepository.save(appointment)

    return appointment;
  }
}

export default CreateAppointmentService;
