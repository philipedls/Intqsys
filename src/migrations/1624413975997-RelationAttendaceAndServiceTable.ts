import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class RelationAttendaceAndServiceTable1624413975997 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'atendimentos', new TableForeignKey(
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
