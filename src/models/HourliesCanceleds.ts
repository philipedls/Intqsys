import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'horarios_cancelados' })
export class HourliesCanceleds {
    @PrimaryGeneratedColumn('uuid')
    id_horario_cancelado: string

    @Column()
    @Generated('increment')
    id: number

    @CreateDateColumn()
    data_cadastro: Date

    @UpdateDateColumn()
    data_atualizado: Date

    @Column()
    hora: string

    @Column('uuid')
    servicos_id_servico: string

    @Column('uuid')
    horarios_id_horario: string
}
