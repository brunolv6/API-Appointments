/*
  - Recebimento das infos
  - Tratativa de erros
  - Acesso ao repo
*/

// Exclusivamente responsável pela criação do appointment neste caso

import Appointment from "../infra/typeorm/entities/Appointment"
import AppointmentsRepository from "../repositories/AppointmentsRepository";

import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '../../../shared/errors/AppError';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {

  public async execute({ provider_id, date }: Request): Promise<Appointment> {

    // get all methods of Database
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    // add await otherwise it go to the next line without receive the value of findAppointmnetSameDate
    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

    if(findAppointmentInSameDate){
      throw new AppError('This appointmet is already booked');
    }

    // create entity but not saving
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate
    });

    // save entity on database
    await appointmentsRepository.save(appointment)

    return appointment;
  }
}

export default CreateAppointmentService;
