import {Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity({name: 'licensas'})
export class Licences {

    @PrimaryGeneratedColumn('uuid')
    id_licensa: string

    @Column()
    @Generated('increment')
    id: number

    @CreateDateColumn('timestamp')
    data_cadastro: Date

    @UpdateDateColumn('timestamo')
    data_atualizado: Date

    @Column()
    valor: string

    @Column()
    status: boolean

    @Column()
    licensas_col: string

}
