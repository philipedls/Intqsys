import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class RelationCompaniesAvaliations1619306171464 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'avaliacoes', new TableForeignKey(
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
