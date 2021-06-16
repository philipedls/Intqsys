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
                        name: 'hora_inicio',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'hora_final',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'tempo_atendimento',
                        type: 'varchar',
                        isNullable: true
                    }
                ]
            }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('atendimentos');
    }

}
