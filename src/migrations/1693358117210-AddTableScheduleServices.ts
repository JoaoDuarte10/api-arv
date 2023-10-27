import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTableScheduleServices1693358117210
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE api_arv.schedule_services (
            idschedule_services SERIAL PRIMARY KEY NOT NULL,
            idschedules INT NOT NULL,
            idcatalog INT NOT NULL,
            created_at TIMESTAMP DEFAULT NOW() NOT NULL,
            updated_at TIMESTAMP NULL,
            FOREIGN KEY(idschedules) REFERENCES api_arv.schedules(idschedules),
            FOREIGN KEY(idcatalog) REFERENCES api_arv.catalogs(idcatalog)
        );`,
    );
    await queryRunner.query(
      'CREATE INDEX "idx_schedule_services_idschedules" ON api_arv.schedule_services(idschedules)',
    );
    await queryRunner.query(
      'CREATE INDEX "idx_schedule_services_idcatalog" ON api_arv.schedule_services(idcatalog)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE api_arv.schedule_services');
    await queryRunner.query('DROP INDEX "idx_schedule_services_idschedules"');
    await queryRunner.query('DROP INDEX "idx_schedule_services_idcatalog"');
  }
}
