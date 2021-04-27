import { Column, CreateDateColumn, Entity, Generated, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Licences } from "./licences.models";

@Entity({ name: 'cobrancas' })
export class Charges {

    @PrimaryGeneratedColumn('uuid')
    id_cobranca: string

    @Column()
    @Generated('increment')
    id: number

    // @CreateDateColumn('timestamp')
    // data_cadastro: Date

    // @UpdateDateColumn('timestamo')
    // data_atualizado: Date

    @Column()
    status: boolean

    @Column()
    data_vencimento: Date

    @Column('uuid')
    empresas_id_empresa: string

    // @ManyToOne(type => Licences, empresa => empresa.cobrancas)
    // licensa: Licences

}
