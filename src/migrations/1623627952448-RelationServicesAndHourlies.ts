import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class RelationCompaniesHourlies1623627952448 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKeys(
            'horarios',
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
                        columnNames: ['horarios_id_horario_marcado'],
                        referencedTableName: 'horarios_cancelados',
                        referencedColumnNames: ['id_horario_marcado']
                    }
                )
            ]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
