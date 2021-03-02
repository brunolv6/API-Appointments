// define entity of some table of Database
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import User from '../../../../users/infra/typeorm/entities/User';

/*
  Um para um (OneToOne) - um usuário apenas um agendamento
  Um para Muitos (OneToMany) - um usuário para muitos agendamentos
  Muitos para Muitos (ManyToMany) - varios usuários em vários agendamentos (o no mesmo)
*/

// decorator to define entity
@Entity('appointments')
class Appointment{
  @PrimaryGeneratedColumn('uuid') // universal unique id
  id: string;

  @Column() // wait for a string
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name:'provider_id' })
  provider: User

  @Column('timestamp with time zone') //with timezone its only to postgres
  date: Date;

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  // constructor come from decorator
};

export default Appointment;

