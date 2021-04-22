import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCompaniesTable1619009640605 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'empresas',
                columns: [
                    {
                        name: 'id_empresa',
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
                        name: 'razao_social',
                        type: 'varchar'
                    },
                    {
                        name: 'nome_fantasia',
                        type: 'varchar'
                    },
                    {
                        name: 'cnpj',
                        type: 'varchar'
                    },
                    {
                        name: 'cep',
                        type: 'varchar'
                    },
                    {
                        name: 'logradouro',
                        type: 'varchar'
                    },
                    {
                        name: 'numero',
                        type: 'varchar'
                    },
                    {
                        name: 'complemento',
                        type: 'varchar'
                    },
                    {
                        name: 'bairro',
                        type: 'varchar'
                    },
                    {
                        name: 'cidade',
                        type: 'varchar'
                    },
                    {
                        name: 'estado',
                        type: 'varchar'
                    },
                    {
                        name: 'logo',
                        type: 'varchar'
                    },
                    {
                        name: 'atende_feriado',
                        type: 'boolean'
                    },
                    {
                        name: 'ativo',
                        type: 'boolean'
                    },
                    {
                        name: 'token',
                        type: 'int'
                    },
                    {
                        name: 'data_desativacao',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'email_cobranca',
                        type: 'varchar'
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('empresas');
    }

}
