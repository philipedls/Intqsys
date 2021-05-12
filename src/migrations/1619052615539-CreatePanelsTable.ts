import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePanelsTable1619052615539 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'paineis',
                columns: [
                    {
                        name: 'id_painel',
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
                        name: 'titulo',
                        type: 'varchar'
                    },
                    {
                        name: 'status',
                        type: 'boolean',
                        isNullable: true
                    },
                    {
                        name: 'cancelado',
                        type: 'boolean',
                        isNullable: true
                    },
                    {
                        name: 'data_cancelamento',
                        type: 'timestamp',
                        isNullable: true
                    },
                    {
                        name: 'empresas_id_empresa',
                        type: 'uuid',
                        isNullable: true
                    }
                ]
            }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('paineis');
    }

}
