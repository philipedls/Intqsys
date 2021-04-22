import { Column, CreateDateColumn, Entity, Generated, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Companies } from "./companies.models";

@Entity({ name: 'paineis' })
export class Paineis {

    @PrimaryGeneratedColumn('uuid')
    id_painel: string

    @Column()
    @Generated('increment')
    id: number

    @CreateDateColumn('timestamp')
    data_cadastro: Date

    @UpdateDateColumn('timestamo')
    data_atualizado: Date

    @Column()
    titulo: string

    @Column()
    status: boolean

    @Column()
    cancelado: string

    @Column()
    data_cancelamento: Date

    @ManyToOne(() => Companies, empresa => empresa.avaliacoes)
    empresa: Companies
}
