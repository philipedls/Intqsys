import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'guiche' })
export class Desk {

    @PrimaryGeneratedColumn('uuid')
    id_guiche: string

    @Column()
    @Generated('increment')
    id: number

    @CreateDateColumn()
    data_cadastro: Date

    @UpdateDateColumn()
    data_atualizado: Date

    @Column()
    nome: string

    @Column()
    codigo: string

    @Column()
    janela: string

}
