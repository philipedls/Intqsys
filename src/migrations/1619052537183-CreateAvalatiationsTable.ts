import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAvalatiationsTable1619052537183 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'avaliacoes',
                columns: [
                    {
                        name: 'id_avaliacao',
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
                        default: 'now()'
                    },
                    {
                        name: 'data_atualizado',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'nota',
                        type: 'int'
                    },
                    {
                        name: 'autor',
                        type: 'varchar'
                    },
                    {
                        name: 'telefone_autor',
                        type: 'varchar'
                    },
                    {
                        name: 'email_autor',
                        type: 'varchar'
                    },
                    {
                        name: 'empresas_id_empresa',
                        type: 'uuid'
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('avaliacoes');
    }

}
