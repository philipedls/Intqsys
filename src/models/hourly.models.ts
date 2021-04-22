import { Column, CreateDateColumn, Entity, Generated, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Companies } from "./companies.models";
import { Schedules } from "./schedules.models";

@Entity({ name: 'horarios' })
export class Hourlies {

    @PrimaryGeneratedColumn('uuid')
    id_horario: string

    @Column()
    @Generated('increment')
    id: number

    @CreateDateColumn('timestamp')
    data_cadastro: Date

    @UpdateDateColumn('timestamo')
    data_atualizado: Date

    @Column()
    hora: string

    @Column()
    status: boolean

    @Column()
    token: number

    @ManyToOne(() => Companies, empresa => empresa.avaliacoes)
    empresa: Companies

    @OneToMany(() => Schedules, agendamento => agendamento.horario)
    agendamentos: Schedules[]
}
