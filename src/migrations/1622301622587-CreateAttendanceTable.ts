import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAttendanceTable1622301622587 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'atendimentos',
                columns: [
                    {
                        name: 'id_atendimento',
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
                        type: 'boolean',
                        isNullable: true
                    },
                    {
                        name: 'inicio_atendimento',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'fim_atendimento',
                        type: 'varchar',
                        isNullable: true
                    },
                ]
            }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('atendimentos');
    }

}
