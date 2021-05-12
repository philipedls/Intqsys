import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTotemsTable1619052676138 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'totems',
                columns: [
                    {
                        name: 'id_totem',
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
                        name: 'titulo',
                        type: 'varchar'
                    },
                    {
                        name: 'codigo',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'totem_col',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'data_cancelado',
                        type: 'timestamp',
                        isNullable: true
                    },
                    {
                        name: 'empresas_id_empresa',
                        type: 'uuid',
                        isNullable: true
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('totems');
    }

}
