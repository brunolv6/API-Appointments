/*
  - Recebimento das infos
  - Tratativa de erros
  - Acesso ao repo
*/

// Exclusivamente responsável pela criação do appointment neste caso

import Appointment from "../infra/typeorm/entities/Appointment"

import { startOfHour } from 'date-fns';

import AppError from '../../../shared/errors/AppError';
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

interface IRequest {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {

  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {

    const appointmentDate = startOfHour(date);

    // add await otherwise it go to the next line without receive the value of findAppointmnetSameDate
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);

    if(findAppointmentInSameDate){
      throw new AppError('This appointmet is already booked');
    }

    // create entity and saving
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate
    });


    return appointment;
  }
}

export default CreateAppointmentService;
