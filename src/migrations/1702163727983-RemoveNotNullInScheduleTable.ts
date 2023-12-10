import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveNotNullInScheduleTable1702163727983
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE api_arv.schedules ALTER COLUMN description DROP NOT NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE api_arv.schedules ALTER COLUMN description SET NOT NULL;
    `);
  }
}
