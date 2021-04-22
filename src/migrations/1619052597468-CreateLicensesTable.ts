import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateLicensesTable1619052597468 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'licensas',
                columns: [
                    {
                        name: 'id_licensa',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: false,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'data_cadastro',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP'
                    },
                    {
                        name: 'data_atualizado',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP'
                    },
                    {
                        name: 'valor',
                        type: 'varchar'
                    },
                    {
                        name: 'stalicensas_coltus',
                        type: 'boolean'
                    },
                    {
                        name: '',
                        type: 'varchar'
                    },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('licensas');
    }

}
