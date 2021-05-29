import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'empresas' })
export class Companies {

    @PrimaryGeneratedColumn('uuid')
    id_empresa: string

    @Column()
    @Generated('increment')
    id: number

    @CreateDateColumn()
    data_cadastro: Date

    @UpdateDateColumn()
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

    // @OneToMany(type => Avaliations, avaliacao => avaliacao.empresa)
    // avaliacoes: Avaliations[]

    // @OneToMany(type => Totems, totem => totem.empresa)
    // totems: Totems[]

    // @OneToMany(type => Licences, licences => licences.empresa)
    // licensas: Licences[]

    // @OneToMany(type => Hourlies, horarios => horarios.empresa)
    // horarios: Hourlies[]

    // @OneToMany(type => Services, servico => servico.empresas)
    // servicos: Services[]

    // @OneToMany(type => Users, usuario => usuario.empresa)
    // usuarios: Users[]

    // @OneToMany(type => Paineis, painel => painel.empresa)
    // paineis: Paineis[]

}
