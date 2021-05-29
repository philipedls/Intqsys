import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'formas_pagamento' })
export class Payments {

    @PrimaryGeneratedColumn('uuid')
    id_forma_pagamento: string

    @Column()
    @Generated('increment')
    id: number

    @CreateDateColumn()
    data_cadastro: Date

    @UpdateDateColumn()
    data_atualizado: Date

    @Column()
    titulo: string

    @Column()
    status: boolean

    @Column()
    descricao: string

    // @OneToMany(type => Licences, licensa => licensa.pagamento)
    // licensas: Licences[]
}
