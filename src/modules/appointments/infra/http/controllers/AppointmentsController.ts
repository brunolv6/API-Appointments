import { Request, Response } from "express";
import { parseISO } from 'date-fns';

import CreateAppointmentService from '../../../services/CreateAppointmentService';
import { container } from 'tsyringe';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response>{
    const { provider_id, date } = request.body;

    // data transformation
    const parsedDate = parseISO(date);

    // service to create appointment
    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id
    })

    return response.json(appointment);
  }
}
