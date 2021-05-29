import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'filas' })
export class Queues {

    @PrimaryGeneratedColumn('uuid')
    id_fila: string

    @Column()
    @Generated('increment')
    id: number

    @Column()
    data_atendimento: Date

    @Column()
    posicao: number

    @Column()
    status: boolean

    @Column()
    codigo: string

    @Column()
    tipo: string

    @Column()
    cancelado: boolean

    @Column()
    data_cancelamento: Date

    @Column()
    horario: string

    @Column()
    servico: string

    @Column()
    paciente: string

    @Column('uuid')
    horarios_id_horario: string

    @Column('uuid')
    servicos_id_servico: string

    @Column('uuid')
    pacientes_id_paciente: string
}
