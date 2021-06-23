import { Column, CreateDateColumn, Entity, Generated, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Services } from "./services.models";

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
    hora_inicio: string

    @Column()
    hora_final: string

    @Column()
    tempo_atendimento: string

    @Column()
    status: boolean

    @Column('uuid')
    servicos_id_servico: string

    @OneToOne(() => Services, service => service.id_servico)
    servico: Services
}
