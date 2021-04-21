import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
}
