import { Column, CreateDateColumn, Entity, Generated, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Hourlies } from "./hourly.models";
import { Schedules } from "./schedules.models";

@Entity({ name: 'horarios_cancelados' })
export class SchedulesTimes {
    @PrimaryGeneratedColumn('uuid')
    id_horario_marcado: string

    @Column()
    @Generated('increment')
    id: number;

    @CreateDateColumn()
    data_cadastro: Date;

    @UpdateDateColumn()
    data_atualizado: Date;

    @Column()
    data_atendimento: Date;

    @Column('uuid')
    servicos_id_servico: string;

    @Column('uuid')
    horarios_id_horario: string;

    @Column('uuid')
    agendamentos_id_agendamento: string;

    @OneToOne(() => Hourlies, hourly => hourly.id_horario)
    horario: Hourlies;

    @OneToOne(() => Schedules, schedule => schedule.id_agendamento)
    agendamento: Schedules;
}
