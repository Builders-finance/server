import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTransactions1617299262335 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'transactions',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()'
            },
            {
              name: 'user_id',
              type: 'uuid',
            },
            {
              name: 'rev_exp_id',
              type: 'uuid',
            },
            {
              name: 'valor',
              type: 'decimal',
              precision: 10,
              scale: 2
            },
            {
              name: 'forma_pagamento',
              type: 'enum',
              enum: ['debit', 'credit', 'cash', 'pix']
            },
            {
              name: 'status_pagamento',
              type: 'enum',
              enum: ['paid', 'unpaid', 'partial']
            },
            {
              name: 'description',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'status',
              type: 'int',
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()',
            },
          ],
          foreignKeys: [
            {
              name: 'RevExp',
              referencedTableName: 'rev_exp',
              referencedColumnNames: ['id'],
              columnNames: ['rev_exp_id'],
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
            },
            {
              name: 'Users',
              referencedTableName: 'users',
              referencedColumnNames: ['id'],
              columnNames: ['user_id'],
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
            }
          ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('transactions');
    }

}
