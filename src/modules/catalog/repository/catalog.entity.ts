import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CatalogsEntityDB {
  @PrimaryGeneratedColumn()
  idCatalog: number;

  @Column()
  idUsers: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
