import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDeskTable1624761505436 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'guiche',
                columns: [
                    {
                        name: 'id_guiche',
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
                        name: 'nome',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'codigo',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'janela',
                        type: 'varchar',
                        isNullable: true
                    },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
