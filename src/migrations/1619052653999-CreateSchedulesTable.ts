import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSchedulesTable1619052653999 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'agendamentos',
                columns: [
                    {
                        name: 'id_agendamento',
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
                        type: 'boolean'
                    },
                    {
                        name: 'codigo',
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
                        name: 'token',
                        type: 'int',
                        isNullable: true
                    },
                    {
                        name: 'servicos_id_servico',
                        type: 'uuid',
                        isNullable: true
                    },
                    {
                        name: 'horarios_id_horario',
                        type: 'uuid',
                        isNullable: true
                    },
                    {
                        name: 'pacientes_id_paciente',
                        type: 'uuid',
                        isNullable: true
                    }
                ]
            }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('agendamentos');
    }

}
