import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class RelationCompaniesPanels1619306559904 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'paineis', new TableForeignKey(
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
