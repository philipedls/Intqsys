import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class RelationQueuePatientAndServices1623629464215 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKeys(
            'filas',
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
                        columnNames: ['pacientes_id_paciente'],
                        referencedTableName: 'pacientes',
                        referencedColumnNames: ['id_paciente']
                    }
                ),
                new TableForeignKey(
                    {
                        columnNames: ['horarios_id_horario'],
                        referencedTableName: 'horarios',
                        referencedColumnNames: ['id_horario']
                    }
                )
            ]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}