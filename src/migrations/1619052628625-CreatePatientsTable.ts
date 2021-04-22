import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePatientsTable1619052628625 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'pacientes',
                columns: [
                    {
                        name: 'id_paciente',
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
                        name: 'status',
                        type: 'boolean'
                    },
                    {
                        name: 'paciente_nome',
                        type: 'varchar'
                    },
                    {
                        name: 'paciente_telefone',
                        type: 'varchar',
                    },
                    {
                        name: 'paciente_cpf',
                        type: 'varchar',
                    },
                    {
                        name: 'paciente_email',
                        type: 'varchar',
                    },
                    {
                        name: 'cancelado',
                        type: 'boolean',
                    },
                    {
                        name: 'data_cancelamento',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP'
                    },
                    {
                        name: 'token',
                        type: 'int',
                    },
                ]
            }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('pacientes');
    }

}
