import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Totems } from 'src/models/totems.models';
import { Repository } from 'typeorm';
import { TotemDto } from './Dto/totem.dto';
import { TotemFetchDto } from './Dto/totem.fetch.dto';

@Injectable()
export class TotemService {

    constructor(
        @InjectRepository(Totems)
        private totemRepository: Repository<Totems>
    ) { }

    async index(): Promise<any[]> {
        const totems = Array();
        const totemsResult = await this.totemRepository.find();

        for (let index = 0; index < totemsResult.length; index++) {
            const { id_totem, codigo, titulo, status } = totemsResult[index];
            totems.push({
                id_totem: id_totem,
                codigo: codigo,
                titulo: titulo,
                status: status
            });
        }

        return totems;
    }

    async store(data: TotemDto): Promise<Totems> {
        data.codigo = Math.floor(9).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString();

        const totem = await this.totemRepository.create(data);
        return this.totemRepository.save(totem);
    }

    async disable(uid: string): Promise<Totems> {
        const totem = await this.totemRepository.findOne({ id_totem: uid });
        totem.status = false;
        return this.totemRepository.save(totem);
    }

    async activate(uid: string): Promise<Totems> {
        const totem = await this.totemRepository.findOne({ id_totem: uid });
        totem.status = true;
        return this.totemRepository.save(totem);
    }

    async findOneByUUID(data: TotemFetchDto): Promise<Totems | undefined> {
        return this.totemRepository.findOne({ id_totem: data.id_totem });
    }

    async findeTotemAmount(): Promise<any | undefined> {
        const totems = await this.totemRepository.find();

        return { size: totems.length };
    }

    findeTotemActivatedAmount(): Promise<any | undefined> {
        return this.totemRepository.find({ status: true });

        // return { size: totems.length };
    }
}
