import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class RelationCompaniesCharges1619306243397 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'cobrancas', new TableForeignKey(
                {
                    columnNames: ['licensas_id_licensa'],
                    referencedTableName: 'licensas',
                    referencedColumnNames: ['id_licensa']
                }
            )
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
