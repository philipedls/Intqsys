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
    cancelado: boolean

    @Column()
    data_cancelamento: Date

    @Column('uuid')
    servicos_id_servico: string

    @Column('uuid')
    pacientes_id_paciente: string

}
