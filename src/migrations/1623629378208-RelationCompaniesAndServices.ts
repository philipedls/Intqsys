import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class RelationCompaniesServices1623629378208 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'servicos', new TableForeignKey(
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
