import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateReportsTable1622301622586 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'relatorios',
                columns: [
                    {
                        name: 'id_relatorio',
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
                        name: 'autor_usuario',
                        type: 'uuid',
                        isNullable: true
                    },
                    {
                        name: 'autor_cliente',
                        type: 'uuid',
                        isNullable: true
                    },
                    {
                        name: 'codigo_acao',
                        type: 'uuid',
                        isNullable: true
                    },
                    {
                        name: 'categoria',
                        type: 'varchar',
                    },
                    {
                        name: 'operador',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'cancelar',
                        type: 'boolean',
                    },
                    {
                        name: 'cadastrar',
                        type: 'boolean',
                    },
                    {
                        name: 'editar',
                        type: 'boolean',
                    },
                    {
                        name: 'login',
                        type: 'boolean',
                    },
                    {
                        name: 'logout',
                        type: 'boolean',
                    },
                    {
                        name: 'agendamento',
                        type: 'boolean',
                    },
                    {
                        name: 'fila',
                        type: 'boolean',
                    },
                    {
                        name: 'walkin',
                        type: 'boolean',
                    },
                    {
                        name: 'id_cliente',
                        type: 'uuid',
                        isNullable: true
                    },
                    {
                        name: 'atendimento',
                        type: 'boolean',
                    },
                    {
                        name: 'observacao',
                        type: 'varchar',
                        isNullable: true
                    },
                ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('relatoriosƒ');
    }

}
