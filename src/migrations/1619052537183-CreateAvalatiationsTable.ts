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
                        default: 'CURRENT_TIMESTAMP'
                    },
                    {
                        name: 'data_atualizado',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP'
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
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('avaliacoes');
    }

}
