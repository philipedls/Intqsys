import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
}
