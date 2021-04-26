import {MigrationInterface, QueryRunner} from "typeorm";

export class ColumnDataTransactions1617823831105 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE transactions ADD data TIMESTAMP NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE transactions DROP COLUMN data");
    }

}
