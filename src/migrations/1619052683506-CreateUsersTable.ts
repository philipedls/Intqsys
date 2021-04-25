import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1619052683506 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'usuarios',
                columns: [
                    {
                        name: 'id_usuario',
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
                        name: 'nome',
                        type: 'varchar'
                    },
                    {
                        name: 'login',
                        type: 'varchar'
                    },
                    {
                        name: 'senha',
                        type: 'varchar'
                    },
                    {
                        name: 'email',
                        type: 'varchar'
                    },
                    {
                        name: 'status',
                        type: 'boolean'
                    },
                    {
                        name: 'token',
                        type: 'int'
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
        await queryRunner.dropTable('usuarios');
    }


}
