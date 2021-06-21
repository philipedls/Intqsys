import { Column, CreateDateColumn, Entity, Generated, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SchedulesTimes } from "./schedules.times";

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
    token: string

    @Column('uuid')
    servicos_id_servico: string

    @OneToOne(() => SchedulesTimes, schedulesTimes => schedulesTimes.id_horario_marcado)
    horario_marcado: SchedulesTimes
}
