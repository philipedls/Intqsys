import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateHourliesCanceledTable1622301622689 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'horarios_cancelados',
                columns: [
                    {
                        name: 'id_horario_marcado',
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
                        name: 'data_atendimento',
                        type: 'timestamp',
                        isNullable: true
                    },
                    {
                        name: 'hora',
                        type: 'varchar',
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
                        name: 'agendamentos_id_agendamento',
                        type: 'uuid',
                        isNullable: true
                    },
                ]
            }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('horarios_cancelados');
    }

}
