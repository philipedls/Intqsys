import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'formas_pagamento' })
export class Payments {

    @PrimaryGeneratedColumn('uuid')
    id_forma_pagamento: string

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
    status: boolean

    @Column()
    descricao: string

    // @OneToMany(type => Licences, licensa => licensa.pagamento)
    // licensas: Licences[]
}
