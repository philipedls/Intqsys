import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class RelationCompaniesSchedules1623629338691 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKeys(
            'agendamentos',
            [
                new TableForeignKey(
                    {
                        columnNames: ['servicos_id_servico'],
                        referencedTableName: 'servicos',
                        referencedColumnNames: ['id_servico']
                    }
                ),
                new TableForeignKey(
                    {
                        columnNames: ['horarios_id_horario'],
                        referencedTableName: 'horarios',
                        referencedColumnNames: ['id_horario']
                    }
                ),
                new TableForeignKey(
                    {
                        columnNames: ['pacientes_id_paciente'],
                        referencedTableName: 'pacientes',
                        referencedColumnNames: ['id_paciente']
                    }
                ),
                new TableForeignKey(
                    {
                        columnNames: ['atendimentos_id_atendimento'],
                        referencedTableName: 'atendimentos',
                        referencedColumnNames: ['id_atendimento']
                    }
                ),
            ]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
