import { type } from "node:os";
import { Column, CreateDateColumn, Entity, Generated, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Companies } from "./companies.models";
import { Schedules } from "./schedules.models";

@Entity({ name: 'servicos' })
export class Services {

    @PrimaryGeneratedColumn('uuid')
    id_servico: string

    @Column()
    @Generated('increment')
    id: number

    // @CreateDateColumn('timestamp')
    // data_cadastro: Date

    // @UpdateDateColumn('timestamo')
    // data_atualizado: Date

    @Column()
    titulo: string

    @Column()
    imagem: string

    @Column()
    status: boolean

    @Column()
    token: number

    @Column('uuid')
    empresas_id_empresa: string

    // @ManyToOne(type => Companies, empresa => empresa.avaliacoes)
    // empresas: Companies

    // @OneToMany(type => Schedules, agendamento => agendamento.servico)
    // agendamentos: Schedules[]

}
