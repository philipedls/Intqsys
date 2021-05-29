import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'paineis' })
export class Paineis {

    @PrimaryGeneratedColumn('uuid')
    id_painel: string

    @Column()
    @Generated('increment')
    id: number

    @CreateDateColumn()
    data_cadastro: Date

    @UpdateDateColumn()
    data_atualizado: Date

    @Column()
    titulo: string

    @Column()
    status: boolean

    @Column()
    cancelado: boolean

    @Column()
    codigo: string

    @Column()
    data_cancelamento: Date

    @Column('uuid')
    empresas_id_empresa: string

    // @ManyToOne(type => Companies, empresa => empresa.avaliacoes)
    // empresa: Companies
}
