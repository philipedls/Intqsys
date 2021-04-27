import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateChargesTable1619052555512 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table(
                {
                    name: 'cobrancas',
                    columns: [
                        {
                            name: 'id_cobranca',
                            type: 'uuid',
                            isPrimary: true,
                            isGenerated: true,
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
                            default: 'now()'
                        },
                        {
                            name: 'data_atualizado',
                            type: 'timestamp',
                            default: 'now()'
                        },
                        {
                            name: 'status',
                            type: 'int'
                        },
                        {
                            name: 'data_vencimento',
                            type: 'timestamp',
                            isNullable: true
                        },
                        {
                            name: 'licensas_id_licensa',
                            type: 'uuid',
                            isNullable: true
                        }
                    ]
                }
            )
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('cobrancas');
    }

}
