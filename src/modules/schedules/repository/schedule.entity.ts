import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ScheduleStatus } from '../schedule-dto';

import { RelationOptions } from 'typeorm';

export const manyToManyOptions = {
  cascade: false,
  nullable: true,
} as RelationOptions;

export const manyToOneOptions = {
  cascade: true,
  nullable: false,
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
} as RelationOptions;

export const oneToManyOptions = {
  nullable: false,
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
} as RelationOptions;

export const oneToOneOptions = {
  cascade: true,
  nullable: false,
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
} as RelationOptions;

@Entity('api_arv.schedules')
export class ScheduleEntityDB {
  @PrimaryGeneratedColumn({ name: 'idschedules' })
  idSchedules: number;

  @Column({ nullable: false, name: 'idusers' })
  idUsers: number;

  @Column({ nullable: false, name: 'idclients' })
  idClients: number;

  @Column({ nullable: true, name: 'client_name' })
  clientName: string;

  @Column({ nullable: false, name: 'description' })
  description: string;

  @Column({ nullable: false, name: 'time' })
  time: string;

  @Column({ nullable: false, name: 'date' })
  date: string;

  @Column({ nullable: false, name: 'pacote' })
  pacote: boolean;

  @Column({ nullable: true, name: 'atendence_count' })
  atendenceCount: number;

  @Column({ nullable: true, name: 'total_atendence_count' })
  totalAtendenceCount: number;

  @Column({ nullable: false, name: 'status' })
  status: ScheduleStatus;

  @Column({ nullable: false, name: 'created_at' })
  createdAt: Date;

  @Column({ nullable: true, name: 'updated_at' })
  updatedAt: Date;
}
