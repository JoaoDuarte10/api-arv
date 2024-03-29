import { Inject, Injectable } from '@nestjs/common';
import { ClientDto, ListClientDto } from '../client-dto';
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
  ): Promise<ListClientDto[]> {
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
              WHERE c.idusers = $1 AND c.${field} = $2 AND deleted = false
              ORDER BY c.name;`,
      values: [idusers, value],
    };
    const { rows } = await this.database.query(sql.text, sql.values);
    return rows.map((client) => this.normalizePayload(client));
  }

  async find(idusers: number): Promise<ListClientDto[]> {
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
              WHERE c.idusers = $1 AND deleted = false
              ORDER BY c.name;`,
      values: [idusers],
    };
    const { rows } = await this.database.query(sql.text, sql.values);
    return rows.map((client) => this.normalizePayload(client));
  }

  async create(params: ClientDto): Promise<void> {
    const date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

    const sql = {
      text: `INSERT INTO api_arv.clients(
            idusers,
            name,
            email,
            phone,
            idsegments,
            address,
            address_number,
            note,
            created_at
          ) VALUES(
            $1, $2, $3, $4, $5, $6, $7, $8, $9
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
        date,
      ],
    };
    await this.database.query(sql.text, sql.values);
  }

  async update(params: ClientDto): Promise<void> {
    const date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

    const sql = {
      text: 'UPDATE api_arv.clients SET name = $1, email = $2, phone = $3, idsegments = $4, address = $5, address_number = $6, note = $7, updated_at = $8 WHERE idclients = $9 AND idusers = $10;',
      values: [
        params.name,
        params.email,
        params.phone,
        params.idsegment,
        params.address,
        params.addressNumber,
        params.note,
        date,
        params.idclients,
        params.idusers,
      ],
    };
    await this.database.query(sql.text, sql.values);
  }

  async delete(idusers: number, idclients: number): Promise<void> {
    const date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

    await this.database.query(
      'UPDATE api_arv.clients SET deleted = $1, updated_at = $2 WHERE idusers = $3 AND idclients = $4;',
      [true, date, idusers, idclients],
    );
  }

  private normalizePayload(payload: any): ListClientDto {
    return {
      idclients: payload.idclients,
      segment: payload.segment,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      address: payload.address,
      addressNumber: payload.addressnumber,
      note: payload.note,
      created_at: payload.created_at,
      updated_at: payload.updated_at,
    };
  }
}
