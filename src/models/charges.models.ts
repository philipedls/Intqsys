import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'cobrancas' })
export class Charges {
    
    @PrimaryGeneratedColumn('uuid')
    id_cobranca: string

    @Column()
    @Generated('increment')
    id: number

    @CreateDateColumn('timestamp')
    data_cadastro: Date

    @UpdateDateColumn('timestamo')
    data_atualizado: Date

    @Column()
    status: boolean

    @Column()
    data_vencimento: Date

}
