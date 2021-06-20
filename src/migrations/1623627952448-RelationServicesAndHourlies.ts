import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class RelationCompaniesHourlies1623627952448 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'horarios', new TableForeignKey(
                {
                    columnNames: ['servicos_id_servico'],
                    referencedTableName: 'servicos',
                    referencedColumnNames: ['id_servico']
                }
            )
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
