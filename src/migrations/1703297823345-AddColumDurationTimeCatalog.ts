import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumDurationTimeCatalog1703297823345
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE api_arv.catalogs ADD COLUMN duration TIME NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE api_arv.catalogs DROP COLUMN duration;
    `);
  }
}
