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

    @CreateDateColumn('timestamp')
    data_cadastro: Date

    @UpdateDateColumn('timestamo')
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

    @ManyToOne(() => Hourlies, horario => horario.agendamentos)
    horario: Hourlies

    @ManyToOne(() => Services, servico => servico.agendamentos)
    servico: Services

    @ManyToOne(() => Patients, paciente => paciente.agendamentos)
    paciente: Patients

}
