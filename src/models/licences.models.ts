import { Column, CreateDateColumn, Entity, Generated, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Charges } from "./charges.models";
import { Companies } from "./companies.models";
import { Payments } from "./payments.models";

@Entity({ name: 'licensas' })
export class Licences {

    @PrimaryGeneratedColumn('uuid')
    id_licensa: string

    @Column()
    @Generated('increment')
    id: number

    @CreateDateColumn('timestamp')
    data_cadastro: Date

    @UpdateDateColumn('timestamo')
    data_atualizado: Date

    @Column()
    valor: string

    @Column()
    status: boolean

    @Column()
    licensas_col: string

    @ManyToOne(() => Companies, empresa => empresa.avaliacoes)
    empresa: Companies

    @OneToMany(() => Charges, cobranca => cobranca.licensa)
    cobrancas: Charges[]

    @ManyToOne(() => Payments, pagamento => pagamento.licensas)
    pagamento: Payments

}
