import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class RelationHourliesCanceledAndHourliesAndServiceTable1624113676510 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKeys(
            'horarios_cancelados',
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
                )
            ]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
