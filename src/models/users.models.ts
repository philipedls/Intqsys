import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'usuarios' })
export class Users {

    @PrimaryGeneratedColumn('uuid')
    id_usuario: string

    @Column()
    @Generated('increment')
    id: number

    @CreateDateColumn()
    data_cadastro: Date

    @UpdateDateColumn()
    data_atualizado: Date

    @Column()
    nome: string

    @Column()
    login: string

    @Column()
    senha: string

    @Column()
    email: string

    @Column()
    role: string

    @Column()
    status: boolean

    @Column()
    token: number

    @Column()
    token_recuperar_senha: string

    @Column('uuid')
    empresas_id_empresa: string

}
