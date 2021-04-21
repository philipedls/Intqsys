import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'totems'})
export class Totems {
    
    @PrimaryGeneratedColumn('uuid')
    id_totem: string

    @Column()
    @Generated('increment')
    id: number

    @CreateDateColumn('timestamp')
    data_cadastro: Date

    @UpdateDateColumn('timestamo')
    data_atualizado: Date

    @Column()
    titulo: string

    @Column()
    totem_col: string

    @Column()
    data_cancelado: Date

    @Column()
    cancelado: boolean

    @Column()
    codigo: string

}
