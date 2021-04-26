import {MigrationInterface, QueryRunner} from "typeorm";

export class ColumnIconRevexp1617823836929 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE rev_exp ADD icon VARCHAR(200) NOT NULL");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE rev_exp DROP COLUMN icon");
  }

}
