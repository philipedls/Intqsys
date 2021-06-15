import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class RelationCompaniesHourlies1623627952448 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'horarios', new TableForeignKey(
                {
                    columnNames: ['empresas_id_empresa'],
                    referencedTableName: 'empresas',
                    referencedColumnNames: ['id_empresa']
                }
            )
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
