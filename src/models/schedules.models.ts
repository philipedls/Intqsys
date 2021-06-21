import { Column, CreateDateColumn, Entity, Generated, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SchedulesTimes } from "./schedules.times";

@Entity({ name: 'agendamentos' })
export class Schedules {

    @PrimaryGeneratedColumn('uuid')
    id_agendamento: string

    @Column()
    @Generated('increment')
    id: number

    @CreateDateColumn()
    data_cadastro: Date

    @UpdateDateColumn()
    data_atualizado: Date

    @Column()
    data_atendimento: Date

    @Column()
    status: boolean

    @Column()
    codigo: string

    @Column()
    cancelado: boolean

    @Column()
    data_cancelamento: Date

    @Column()
    token: number

    @Column('uuid')
    horarios_id_horario: string

    @Column('uuid')
    servicos_id_servico: string

    @Column('uuid')
    pacientes_id_paciente: string

    @Column('uuid')
    atendimentos_id_atendimento: string;

    @OneToOne(() => SchedulesTimes, scheduleTime => scheduleTime.id_horario_marcado)
    horario_marcado: SchedulesTimes;

    // @ManyToOne(type => Hourlies, horario => horario.agendamentos)
    // horario: Hourlies

    // @ManyToOne(type => Services, servico => servico.agendamentos)
    // servico: Services

    // @ManyToOne(type => Patients, paciente => paciente.agendamentos)
    // paciente: Patients

}
