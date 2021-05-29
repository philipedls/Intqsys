import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'cobrancas' })
export class Charges {

    @PrimaryGeneratedColumn('uuid')
    id_cobranca: string

    @Column()
    @Generated('increment')
    id: number

    @CreateDateColumn()
    data_cadastro: Date

    @UpdateDateColumn()
    data_atualizado: Date

    @Column()
    status: boolean

    @Column()
    data_vencimento: Date

    @Column('uuid')
    empresas_id_empresa: string

    // @ManyToOne(type => Licences, empresa => empresa.cobrancas)
    // licensa: Licences

}
