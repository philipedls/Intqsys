import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'horarios' })
export class Hourlies {

    @PrimaryGeneratedColumn('uuid')
    id_horario: string

    @Column()
    @Generated('increment')
    id: number

    @CreateDateColumn()
    data_cadastro: Date

    @UpdateDateColumn()
    data_atualizado: Date

    @Column()
    hora: string

    @Column()
    status: boolean

    @Column()
    token: number

    @Column('uuid')
    empresas_id_empresa: string

    // @ManyToOne(type => Companies, empresa => empresa.avaliacoes)
    // empresa: Companies

    // @OneToMany(type => Schedules, agendamento => agendamento.horario)
    // agendamentos: Schedules[]
}
