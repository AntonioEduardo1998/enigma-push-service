import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Phone {
  constructor(number: string) {
    this.number = number;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;
}
