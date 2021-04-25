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
                        type: 'boolean'
                    },
                    {
                        name: 'licensas_col',
                        type: 'varchar'
                    }, {
                        name: 'empresas_id_empresa',
                        type: 'uuid'
                    },
                    {
                        name: 'pagamentos_id_pagamento',
                        type: 'uuid'
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('licensas');
    }

}
