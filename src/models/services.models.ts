import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'servicos' })
export class Services {

    @PrimaryGeneratedColumn('uuid')
    id_servico: string

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
    imagem: string

    @Column()
    status: boolean

    @Column()
    token: number

}
