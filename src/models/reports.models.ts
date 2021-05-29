import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'relatorios' })
export class Reports {

    @PrimaryGeneratedColumn('uuid')
    id_relatorio: string

    @Column()
    @Generated('increment')
    id: number

    @Column('uuid')
    autor_usuario: string

    @Column('uuid')
    autor_cliente: string

    @Column()
    codigo_acao: string

    @Column()
    categoria: string

    @Column()
    operador: string

    @Column()
    cancelar: boolean

    @Column()
    cadastrar: boolean

    @Column()
    editar: boolean

    @Column()
    login: boolean

    @Column()
    logout: boolean

    @Column()
    agendamento: boolean

    @Column()
    fila: boolean

    @Column()
    walkin: boolean

    @Column('uuid')
    id_cliente: string

    @Column()
    observacao: string

    @Column()
    atendimento: boolean
}
