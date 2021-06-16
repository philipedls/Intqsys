import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateServicesTable1619052660944 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'servicos',
                columns: [
                    {
                        name: 'id_servico',
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
                        name: 'titulo',
                        type: 'varchar'
                    },
                    {
                        name: 'imagem',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'token',
                        type: 'int',
                        isNullable: true
                    },
                    {
                        name: 'tempo_medio_atendimento',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'empresas_id_empresa',
                        type: 'uuid',
                        isNullable: true
                    }
                ]
            }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('servicos');
    }


}
