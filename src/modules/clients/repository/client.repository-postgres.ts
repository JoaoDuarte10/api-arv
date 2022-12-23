import { Inject, Injectable } from '@nestjs/common';
import { ClientDto } from '../client-dto';
import { Database } from '../../../config/db-conn';

@Injectable()
export class ClientRepositoryPostgres {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly database: Database,
  ) {}

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
                c.address,
                c.address_number as addressNumber,
                c.note,
                c.created_at,
                c.updated_at
              FROM api_arv.clients c 
                LEFT JOIN api_arv.segments s ON c.idsegments = s.idsegments
              WHERE c.idusers = $1 AND c.${field} = $2 AND deleted = false;`,
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
                c.address,
                c.address_number as addressNumber,
                c.note,
                c.created_at,
                c.updated_at
              FROM api_arv.clients c 
                LEFT JOIN api_arv.segments s ON c.idsegments = s.idsegments
              WHERE c.idusers = $1 AND deleted = false;`,
      values: [idusers],
    };
    const { rows } = await this.database.query(sql.text, sql.values);
    return rows;
  }

  async create(params: ClientDto): Promise<void> {
    const sql = {
      text: `INSERT INTO api_arv.clients(
            idusers,
            name,
            email,
            phone,
            idsegments,
            address,
            address_number,
            note
          ) VALUES(
            $1, $2, $3, $4, $5, $6, $7, $8
          );`,
      values: [
        params.idusers,
        params.name,
        params.email,
        params.phone,
        params.idsegment,
        params.address,
        params.addressNumber,
        params.note,
      ],
    };
    await this.database.query(sql.text, sql.values);
  }

  async update(params: ClientDto): Promise<void> {
    const sql = {
      text: 'UPDATE api_arv.clients SET name = $1, email = $2, phone = $3, idsegments = $4, address = $5, address_number = $6, note = $7 WHERE idclients = $8 AND idusers = $9;',
      values: [
        params.name,
        params.email,
        params.phone,
        params.idsegment,
        params.idclients,
        params.address,
        params.addressNumber,
        params.note,
        params.idusers,
      ],
    };
    await this.database.query(sql.text, sql.values);
  }

  async delete(idusers: number, idclients: number): Promise<void> {
    await this.database.query(
      'UPDATE api_arv.clients SET deleted = $1 WHERE idusers = $2 AND idclients = $3;',
      [true, idusers, idclients],
    );
  }
}
