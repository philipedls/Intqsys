import { Column, CreateDateColumn, Entity, Generated, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Hourlies } from "./hourly.models";
import { Patients } from "./patients.models";
import { Services } from "./services.models";

@Entity({ name: 'agendamentos' })
export class Schedules {

    @PrimaryGeneratedColumn('uuid')
    id_agendamento: string

    @Column()
    @Generated('increment')
    id: number

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
    servicos_id_servicos: string

    @Column('uuid')
    pacientes_id_paciente: string

    // @ManyToOne(type => Hourlies, horario => horario.agendamentos)
    // horario: Hourlies

    // @ManyToOne(type => Services, servico => servico.agendamentos)
    // servico: Services

    // @ManyToOne(type => Patients, paciente => paciente.agendamentos)
    // paciente: Patients

}
