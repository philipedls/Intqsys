import { Column, CreateDateColumn, Entity, Generated, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Schedules } from "./schedules.models";

@Entity({ name: 'pacientes' })
export class Patients {

    @PrimaryGeneratedColumn('uuid')
    id_patient: string

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
    paciente_nome: string

    @Column()
    paciente_telefone: string

    @Column()
    paciente_cpf: string

    @Column()
    paciente_email: string

    @Column()
    cancelado: boolean

    @Column()
    data_cancelamento: Date

    @Column()
    token: number

    @OneToMany(() => Schedules, agendamento => agendamento.paciente)
    agendamentos: Schedules[]
}
