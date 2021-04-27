import { Column, CreateDateColumn, Entity, Generated, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Companies } from "./companies.models";

@Entity({ name: 'avaliacoes' })
export class Avaliations {

    @PrimaryGeneratedColumn('uuid')
    id_avaliacao: string

    @Column()
    @Generated('increment')
    id: number

    // @CreateDateColumn('timestamp')
    // data_cadastro!: Date

    // @UpdateDateColumn('timestamo')
    // data_atualizado!: Date

    @Column()
    nota: number

    @Column()
    autor: string

    @Column()
    telefone_autor: string

    @Column()
    email_autor: string

    @Column('uuid')
    empresas_id_empresa: string

    // @ManyToOne(type => Companies, empresa => empresa.avaliacoes)
    // empresa: Companies

}
