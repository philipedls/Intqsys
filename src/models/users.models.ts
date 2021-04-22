import { Column, CreateDateColumn, Entity, Generated, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Companies } from "./companies.models";

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

    @ManyToOne(() => Companies, empresa => empresa.avaliacoes)
    empresa: Companies

}
