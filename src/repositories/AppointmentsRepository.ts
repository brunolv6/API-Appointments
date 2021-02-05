// defining connection between code and database (ORM)

import { EntityRepository, Repository } from 'typeorm';
import  Appointment  from "../models/Appointment";

// define which table is this class
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {

  // add method to find by date
  public async findByDate(date: Date): Promise<Appointment | null> {

    // using pre-defined methos of this class
    const findAppointment = await this.findOne({
      where: { date },
    })

    // if findAppointment was undefined, return null
    return findAppointment || null;
  }
};

export default AppointmentsRepository;
