import { Column, CreateDateColumn, Entity, Generated, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Avaliations } from "./avaliations.models";
import { Hourlies } from "./hourly.models";
import { Licences } from "./licences.models";
import { Paineis } from "./panels.models";
import { Services } from "./services.models";
import { Totems } from "./totems.models";
import { Users } from "./users.models";

@Entity({ name: 'empresas' })
export class Companies {

    @PrimaryGeneratedColumn('uuid')
    id_empresa: string

    @Column()
    @Generated('increment')
    id: number

    @CreateDateColumn('timestamp')
    data_cadastro: Date

    @UpdateDateColumn('timestamo')
    data_atualizado: Date

    @Column()
    razao_social: string

    @Column()
    nome_fantasia: string

    @Column()
    cnpj: string

    @Column()
    cep: string

    @Column()
    logradouro: string

    @Column()
    numero: string

    @Column()
    complemento: string

    @Column()
    bairro: string

    @Column()
    cidade: string

    @Column()
    estado: string

    @Column()
    logo: string

    @Column()
    atende_feriado: boolean

    @Column()
    ativo: boolean

    @Column()
    token: number

    @Column()
    data_desativacao: Date

    @Column()
    email_cobranca: string

    @OneToMany(() => Avaliations, avaliacao => avaliacao.empresa)
    avaliacoes: Avaliations[]

    @OneToMany(() => Totems, totem => totem.empresa)
    totems: Totems[]

    @OneToMany(() => Licences, licences => licences.empresa)
    licensas: Licences[]

    @OneToMany(() => Hourlies, horarios => horarios.empresa)
    horarios: Hourlies[]

    @OneToMany(() => Services, servico => servico.empresas)
    servicos: Services[]

    @OneToMany(() => Users, usuario => usuario.empresa)
    usuarios: Users[]

    @OneToMany(() => Paineis, painel => painel.empresa)
    paineis: Paineis[]

}
