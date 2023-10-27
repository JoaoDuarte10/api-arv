import { Inject } from '@nestjs/common';
import { CatalogInputDto } from '../catalog.dto';
import { CatalogRepository } from './catalog.repository';
import { Database } from 'src/config/db-conn';

export class CatalogRepositoryPostgres implements CatalogRepository {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly database: Database,
  ) {}

  async create(params: CatalogInputDto): Promise<void> {
    const date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

    const sql = {
      query: `
        INSERT INTO api_arv.catalogs (
            idusers,
            name,
            description,
            price,
            created_at
        ) VALUES (
            $1, $2, $3, $4, $5
        );
      `,
      values: [
        params.idUsers,
        params.name,
        params.description,
        params.price,
        date,
      ],
    };

    await this.database.query(sql.query, sql.values);
  }

  async update(params: CatalogInputDto): Promise<void> {
    const date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

    const sql = {
      query: `
        UPDATE api_arv.catalogs SET
          name = $1,
          description = $2,
          price = $3,
          updated_at = $4
        WHERE idusers = $5 AND idcatalog = $6;
      `,
      values: [
        params.name,
        params.description,
        params.price,
        date,
        params.idUsers,
        params.idCatalog,
      ],
    };

    await this.database.query(sql.query, sql.values);
  }

  async getOne(idusers: number, idcatalog: number): Promise<CatalogInputDto> {
    const sql = {
      query: `
        SELECT
          c.idcatalog,
          c.idusers,
          c.name,
          c.description,
          c.price,
          c.created_at,
          c.updated_at
        FROM api_arv.catalogs c
        WHERE c.idusers = $1 AND c.idcatalog =  $2
        ORDER BY c.name ASC;
      `,
      values: [idusers, idcatalog],
    };

    const { rows } = await this.database.query(sql.query, sql.values);

    return this.normalizePayload(rows)[0];
  }

  async getAll(idusers: number): Promise<CatalogInputDto[]> {
    const sql = {
      query: `
        SELECT
          c.idcatalog,
          c.idusers,
          c.name,
          c.description,
          c.price,
          c.created_at,
          c.updated_at
        FROM api_arv.catalogs c
        WHERE c.idusers = $1
        ORDER BY c.name ASC;
      `,
      values: [idusers],
    };

    const { rows } = await this.database.query(sql.query, sql.values);

    return this.normalizePayload(rows);
  }

  async delete(idusers: number, idCatalog: number): Promise<void> {
    const sql = {
      query: `DELETE FROM api_arv.catalogs WHERE idusers = $1 AND idcatalog = $2`,
      values: [idusers, idCatalog],
    };

    await this.database.query(sql.query, sql.values);
  }

  normalizePayload(params: any): CatalogInputDto[] {
    return params.map((catalog: any) => ({
      idUsers: Number(catalog.idusers),
      idCatalog: Number(catalog.idcatalog),
      name: catalog.name,
      description: catalog.description,
      price: Number(catalog.price),
      createdAt: catalog.created_at,
      updatedAt: catalog.updated_at,
    }));
  }
}
