import { type } from "node:os";
import { Column, CreateDateColumn, Entity, Generated, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Companies } from "./companies.models";

@Entity({ name: 'totems' })
export class Totems {

    @PrimaryGeneratedColumn('uuid')
    id_totem: string

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
    totem_col: string

    @Column()
    data_cancelado: Date

    @Column()
    cancelado: boolean

    @Column()
    codigo: string

    @Column('uuid')
    empresas_id_empresa: string

    // @ManyToOne(type => Companies, empresa => empresa.avaliacoes)
    // empresa: Companies

}
