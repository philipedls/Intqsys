import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'atendimentos' })
export class Atttendances {

    @PrimaryGeneratedColumn('uuid')
    id_atendimento: string

    @Column()
    @Generated('increment')
    id: number

    @CreateDateColumn()
    data_cadastro: Date

    @UpdateDateColumn()
    data_atualizado: Date

    @Column()
    inicio_atendimento: string

    @Column()
    fim_atendimento: string

    @Column()
    status: boolean

}
