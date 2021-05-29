import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'totems' })
export class Totems {

    @PrimaryGeneratedColumn('uuid')
    id_totem: string

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
    totem_col: string

    @Column()
    status: boolean

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
