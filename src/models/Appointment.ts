import { uuid } from 'uuidv4';
// estrutura de dados que será salvo no banco de dados
// liberar em tsconfig.json os Decorators (são 2)
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// --     "strictPropertyInitialization": false,  false to not need constructor
// --- desta forma a class vira um espécie de argumento do decoratos
// --- que sera usado no banco de dadods chamado appointments
@Entity('appointments')
class Appointment{
  @PrimaryGeneratedColumn('uuid') // universal unique id
  id: string;

  @Column() // automaticamente assumirá que é string
  provider: string;

  @Column('timestamp with time zone') //with timezone its only to postgres
  date: Date;

  // Omit "função" que fala que pegara o objeto sem uma das variaveis
  // -- DESNECEESSRIO PORQUE USAMOS O PRÓPRIO TYPEORM PARA FAZER AS COISAS --
  // constructor({ provider, date }: Omit<Appointment, 'id'> ) {
  //   this.id = uuid();
  //   this.provider = provider;
  //   this.date = date;
  // }
};


// permitir que classe seja acessado externamente
export default Appointment;

// --- Ao inves de decoratos podia usar como high function pelo que entendi
// export default Entity(Appointment);
