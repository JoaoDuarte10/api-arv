import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from '../user-dto';
import { Database } from '../../../config/db-conn';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly database: Database,
  ) {}

  async create(user: UserDto) {
    const sql = {
      query: `INSERT INTO api_arv.users (
                    name,
                    password,
                    phone
                ) VALUES (
                    $1, $2, $3
                );`,
      values: [user.name, user.password, user.phone],
    };
    await this.database.query(sql.query, sql.values);
  }

  async findBy(field: string, value: string) {
    const sql = {
      query: `SELECT * FROM api_arv.users
                    WHERE ${field.toString()} = $1`,
      values: [value],
    };
    const { rows } = await this.database.query(sql.query, sql.values);
    return rows[0];
  }

  async findAll() {
    const sql = 'SELECT * FROM api_arv.users';

    const { rows } = await this.database.query(sql);
    return rows;
  }

  async findOne(username: string): Promise<UserDto> {
    const sql = {
      query: 'SELECT * FROM api_arv.users WHERE name = $1',
      values: [username],
    };

    const { rows } = await this.database.query(sql.query, sql.values);
    return rows[0];
  }
}
