import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'usuarios' })
export class Users {

    @PrimaryGeneratedColumn('uuid')
    id_usuario: string

    @Column()
    @Generated('increment')
    id: number

    @CreateDateColumn('timestamp')
    data_cadastro: Date

    @UpdateDateColumn('timestamo')
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
    status: boolean

    @Column()
    token: number

}
