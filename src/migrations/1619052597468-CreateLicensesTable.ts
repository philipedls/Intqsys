import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateLicensesTable1619052597468 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'licensas',
                columns: [
                    {
                        name: 'id_licensa',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: false,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'data_cadastro',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'data_atualizado',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'valor',
                        type: 'varchar'
                    },
                    {
                        name: 'status',
                        type: 'boolean',
                        isNullable: true
                    },
                    {
                        name: 'licensas_col',
                        type: 'varchar',
                        isNullable: true
                    }, {
                        name: 'empresas_id_empresa',
                        type: 'uuid',
                        isNullable: true
                    },
                    {
                        name: 'pagamentos_id_pagamento',
                        type: 'uuid',
                        isNullable: true
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('licensas');
    }

}
