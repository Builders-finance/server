import {MigrationInterface, QueryRunner} from "typeorm";

export class myMigration1621865937862 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE rev_exp ADD user_id VARCHAR(200)");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE rev_exp DROP COLUMN user_id");
  }

}
