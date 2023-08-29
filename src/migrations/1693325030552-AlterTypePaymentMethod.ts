import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTypePaymentMethod1693325030552 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "payment_method_type" RENAME TO "payment_method_type_old";`,
    );
    await queryRunner.query(
      `CREATE TYPE "payment_method_type" AS ENUM('CREDIT_CARD', 'CASH', 'PIX', 'BILLET', 'MIX');`,
    );
    await queryRunner.query(
      `ALTER TABLE api_arv.outgoing ALTER COLUMN "payment_method" TYPE "payment_method_type" USING "payment_method"::"text"::payment_method_type`,
    );
    await queryRunner.query(
      `ALTER TABLE api_arv.sales ALTER COLUMN "payment_method" TYPE "payment_method_type" USING "payment_method"::"text"::payment_method_type`,
    );
    await queryRunner.query(`DROP TYPE "payment_method_type_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "payment_method_type_old" AS ENUM('CREDIT_CARD', 'CASH', 'PIX', 'BILLET');`,
    );
    await queryRunner.query(
      `ALTER TABLE "api_arv.outgoing" ALTER COLUMN "payment_method" TYPE "payment_method_type_old" USING "payment_method"::"text"::payment_method_type_old`,
    );
    await queryRunner.query(
      `ALTER TABLE "api_arv.sales" ALTER COLUMN "payment_method" TYPE "payment_method_type_old" USING "payment_method"::"text"::payment_method_type_old`,
    );
    await queryRunner.query(`DROP TYPE "payment_method_type"`);
    await queryRunner.query(
      `ALTER TYPE "payment_method_type_old" RENAME TO "payment_method_type";`,
    );
  }
}
