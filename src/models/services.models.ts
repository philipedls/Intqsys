import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    // @ManyToOne(type => Companies, empresa => empresa.avaliacoes)
    // empresas: Companies

    // @OneToMany(type => Schedules, agendamento => agendamento.servico)
    // agendamentos: Schedules[]

}
