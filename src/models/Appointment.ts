// define entity of some table of Database

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// decorator to define entity
@Entity('appointments')
class Appointment{
  @PrimaryGeneratedColumn('uuid') // universal unique id
  id: string;

  @Column() // wait for a string
  provider: string;

  @Column('timestamp with time zone') //with timezone its only to postgres
  date: Date;

  // constructor come from decorator
};

export default Appointment;

