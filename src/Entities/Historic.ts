import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Historic {
  constructor(key: string, phone: string, date: Date) {
    this.key = key;
    this.phone = phone;
    this.date = date;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  phone: string;

  @Column()
  date: Date;
}
