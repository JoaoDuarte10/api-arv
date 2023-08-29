import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnClientNameInSalesTable1693326272295
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE api_arv.sales ADD COLUMN client_name VARCHAR(256);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE api_arv.sales DROP COLUMN client_name;`,
    );
  }
}
