import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class RelationCompaniesLicenses1623627973950 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKeys(
            'licensas',
            [
                new TableForeignKey(
                    {
                        columnNames: ['empresas_id_empresa'],
                        referencedTableName: 'empresas',
                        referencedColumnNames: ['id_empresa']
                    }
                ),
                new TableForeignKey(
                    {
                        columnNames: ['pagamentos_id_pagamento'],
                        referencedTableName: 'pagamentos',
                        referencedColumnNames: ['id_pagamento']
                    }
                )
            ]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
