import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'licensas' })
export class Licences {

    @PrimaryGeneratedColumn('uuid')
    id_licensa: string

    @Column()
    @Generated('increment')
    id: number

    @CreateDateColumn()
    data_cadastro: Date

    @UpdateDateColumn()
    data_atualizado: Date

    @Column()
    valor: string

    @Column()
    status: boolean

    @Column()
    licensas_col: string

    @Column('uuid')
    empresas_id_empresa: string

    @Column('uuid')
    forma_pagamentos_id_forma_pagamento: string

    // @ManyToOne(type => Companies, empresa => empresa.avaliacoes)
    // empresa: Companies

    // @OneToMany(type => Charges, cobranca => cobranca.licensa)
    // cobrancas: Charges[]

    // @ManyToOne(type => Payments, pagamento => pagamento.licensas)
    // pagamento: Payments

}
