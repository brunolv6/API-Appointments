// não usaremos mais pq typeorm fara isto
// import { isEqual } from "date-fns";
import { EntityRepository, Repository } from 'typeorm';

import  Appointment  from "../models/Appointment";


// interface CreateAppointmentDTO {
//   provider: string;
//   date: Date;
// }

// passamos o model neste decorator
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {

  // -- private: variavel não é acessada ppor fora da classe, apenas pelos métodos da classe
  // não salvaremos mais em um ARRAY com a implementação de postgres (DB)
  // private appointments: Appointment[];

  // inicializar e criação
  // constructor() {
  //   this.appointments = []
  // }

  // -- não mais necessário pq ja teremos nosso metodos no tyoeorm
  // public all(): Appointment[]{
  //   return this.appointments;
  // }

  // metodo para ver se ja tem data mascada em appointments
  // pode retornar null ou um dado do tipo Appointment (definido em models)
  public async findByDate(date: Date): Promise<Appointment | null> {

    // iteration of appointments (tirar Appointment na criacao da)
    //-- USAREMOS o DO ORM
    // const findAppointment = this.appointments.find(appointment =>
    //   isEqual(date, appointment.date)
    // );

    // await pq esperarei e asycn lá no nome da função e na definicao de seu retorno será uma Promise
    // -- LOGO poderei usar quando chamr findByDate(date).then(response => ..) ou const response = await findByDate(date)
    const findAppointment = await this.findOne({
      where: { date },
    })

    // -- se findAppointment for undefined, retorna null
    return findAppointment || null;
  }

  // -- quando metodo pode ser acessado de fora da classe
  // public create(variables and type): type of data that gonna return { ..code.. }
  // parametros nomeados
  // -- TIRAMOS porque TypeORM ja possue
  // public create({ provider, date }: CreateAppointmentDTO ): Appointment{
     // CTRL + SPACE get options of date on insomnia JSON body
    // -- OLD WAY abaixo --
    // const appointment = {
    //   id: uuid(),
    //   provider,
    //   date: parsedDate
    // };
    // -- NEW WAY with constructor of class defined --
  //   const appointment = new Appointment({ provider, date });

  //   this.appointments.push(appointment)

  //   return appointment;
  // };
};

export default AppointmentsRepository;
