import { Inject, Injectable } from '@nestjs/common';
import { ClientDto } from '../client-dto';

@Injectable()
export class ClientRepository {
  constructor(@Inject('DATABASE_CONNECTION') private readonly database) {}

  async findBy(
    idusers: number,
    field: string,
    value: string | number,
  ): Promise<ClientDto[]> {
    const sql = {
      text: `SELECT
                c.idclients,
                s.name AS segment,
                c.name,
                c.email,
                c.phone,
                c.created_at,
                c.updated_at
              FROM clients c 
                LEFT JOIN segments s ON c.idsegments = s.idsegments
              WHERE c.idusers = $1 AND c.${field} = $2`,
      values: [idusers, value],
    };

    const { rows } = await this.database.query(sql.text, sql.values);

    return rows;
  }

  async find(idusers: number): Promise<ClientDto[]> {
    const sql = {
      text: `SELECT
                c.idclients,
                s.name AS segment,
                c.name,
                c.email,
                c.phone,
                c.created_at,
                c.updated_at
              FROM clients c 
                LEFT JOIN segments s ON c.idsegments = s.idsegments
              WHERE c.idusers = $1`,
      values: [idusers],
    };

    const { rows } = await this.database.query(sql.text, sql.values);

    return rows;
  }

  async create({
    idusers,
    name,
    email,
    phone,
    idsegments,
  }: any): Promise<void> {
    const sql = {
      text: `INSERT INTO clients(
            idusers,
            name,
            email,
            phone,
            idsegments
          ) VALUES(
            $1, $2, $3, $4, $5
          )`,
      values: [idusers, name, email, phone, idsegments],
    };

    await this.database.query(sql.text, sql.values);
  }

  async update({
    idusers,
    idclients,
    name,
    email,
    phone,
    idsegments,
  }: any): Promise<void> {
    const sql = {
      text: 'UPDATE clients SET name = $1, email = $2, phone = $3, idsegments = $4 WHERE idclients = $5 AND idusers = $6',
      values: [name, email, phone, idsegments, idclients, idusers],
    };

    await this.database.query(sql.text, sql.values);
  }

  async delete(idusers: number, idclients: number): Promise<void> {
    await this.database.query(
      'DELETE FROM clients WHERE idusers = $1 AND idclients = $2',
      [idusers, idclients],
    );
  }
}
