import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateQueueTable1621393417455 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'filas',
                columns: [
                    {
                        name: 'id_fila',
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
                        name: 'posicao',
                        type: 'int'
                    },
                    {
                        name: 'status',
                        type: 'boolean'
                    },
                    {
                        name: 'codigo',
                        type: 'varchar'
                    },
                    {
                        name: 'tipo',
                        type: 'varchar'
                    },
                    {
                        name: 'cancelado',
                        type: 'boolean'
                    },
                    {
                        name: 'data_atendimento',
                        type: 'timestamp',
                    },
                    {
                        name: 'data_cancelamento',
                        type: 'timestamp',
                        isNullable: true
                    },
                    {
                        name: 'horario',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'servico',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'paciente',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'pacientes_id_paciente',
                        type: 'uuid',
                        isNullable: true
                    },
                    {
                        name: 'horarios_id_horario',
                        type: 'uuid',
                        isNullable: true
                    },
                    {
                        name: 'servicos_id_servico',
                        type: 'uuid',
                        isNullable: true
                    },
                    {
                        name: 'situation',
                        type: 'varchar',
                        isNullable: true
                    },
                ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('filas');
    }
}
