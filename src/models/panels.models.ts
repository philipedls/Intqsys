import { type } from "node:os";
import { Column, CreateDateColumn, Entity, Generated, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Companies } from "./companies.models";

@Entity({ name: 'paineis' })
export class Paineis {

    @PrimaryGeneratedColumn('uuid')
    id_painel: string

    @Column()
    @Generated('increment')
    id: number

    // @CreateDateColumn('timestamp')
    // data_cadastro: Date

    // @UpdateDateColumn('timestamo')
    // data_atualizado: Date

    @Column()
    titulo: string

    @Column()
    status: boolean

    @Column()
    cancelado: boolean

    @Column()
    data_cancelamento: Date

    @Column('uuid')
    empresas_id_empresa: string

    // @ManyToOne(type => Companies, empresa => empresa.avaliacoes)
    // empresa: Companies
}
