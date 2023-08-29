import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCatalog1692722239829 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE api_arv.catalogs (
            idcatalog SERIAL PRIMARY KEY NOT NULL,
            idusers INT NOT NULL,
            name VARCHAR(256) NOT NULL,
            description VARCHAR (256) NOT NULL,
            price NUMERIC NOT NULL,
            created_at TIMESTAMP DEFAULT NOW() NOT NULL,
            updated_at TIMESTAMP NULL,
            FOREIGN KEY(idusers) REFERENCES api_arv.users(idusers)
        );
    `);

    await queryRunner.query(
      'CREATE INDEX "idx_catalogs_idcatalog" ON api_arv.catalogs(idcatalog)',
    );
    await queryRunner.query(
      'CREATE INDEX "idx_catalogs_name" ON api_arv.catalogs(name)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE api_arv.catalogs');
    await queryRunner.query('DROP INDEX "idx_catalogs_idcatalog"');
    await queryRunner.query('DROP INDEX "idx_catalogs_name"');
  }
}
