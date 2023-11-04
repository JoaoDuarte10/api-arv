import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ScheduleEntityDB, manyToOneOptions } from './schedule.entity';
import { CatalogsEntityDB } from 'src/modules/catalog/repository/catalog.entity';

@Entity('api_arv.schedule_services')
export class ScheduleServicesEntityDB {
  @PrimaryGeneratedColumn({ name: 'idschedule_services' })
  idScheduleServices: number;

  @Column('int', { array: true, name: 'idschedules' })
  idSchedules: number;
  @OneToMany(() => ScheduleEntityDB, (schedule) => schedule.idSchedules, {
    ...manyToOneOptions,
  })
  @JoinColumn({ name: 'idschedules' })
  schedule?: ScheduleServicesEntityDB | undefined;

  @Column({ name: 'idcatalog' })
  idCatalog: number;
  @OneToMany(() => CatalogsEntityDB, (catalog) => catalog.idCatalog, {
    ...manyToOneOptions,
  })
  @JoinColumn({ name: 'idcatalog' })
  catalog?: number;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;
}
