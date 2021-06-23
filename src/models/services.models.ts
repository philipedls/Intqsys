import { Column, CreateDateColumn, Entity, Generated, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Atttendances } from "./ attendances.models";

@Entity({ name: 'servicos' })
export class Services {

    @PrimaryGeneratedColumn('uuid')
    id_servico: string

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
    imagem: string

    @Column()
    status: boolean

    @Column()
    token: number

    @Column()
    tempo_medio_atendimento: string

    @Column('uuid')
    empresas_id_empresa: string

    @OneToOne(() => Atttendances, attendance => attendance.id_atendimento)
    atendimento: Atttendances

    // @ManyToOne(type => Companies, empresa => empresa.avaliacoes)
    // empresas: Companies

    // @OneToMany(type => Schedules, agendamento => agendamento.servico)
    // agendamentos: Schedules[]

}
