import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateHourliesTable1619052585694 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'horarios',
                columns: [
                    {
                        name: 'id_horario',
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
                        name: 'hora',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'status',
                        type: 'boolean'
                    },
                    {
                        name: 'token',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'servicos_id_servico',
                        type: 'uuid',
                        isNullable: true
                    },
                    {
                        name: 'horarios_id_horario_marcado',
                        type: 'uuid',
                        isNullable: true
                    }
                ]
            }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('horarios');
    }

}
