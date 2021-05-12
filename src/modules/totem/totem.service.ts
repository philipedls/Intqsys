import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Totems } from 'src/models/totems.models';
import { Repository } from 'typeorm';
import { TotemFetchDto } from './Dto/totem.fetch.dto';

@Injectable()
export class TotemService {

    constructor(
        @InjectRepository(Totems)
        private totemRepository: Repository<Totems>
    ) { }


    async findOneByUUID(data: TotemFetchDto): Promise<Totems | undefined> {
        return this.totemRepository.findOne({ id_totem: data.id_totem });
    }

    async findeTotemAmount(): Promise<any | undefined> {
        const totems = await this.totemRepository.find();

        return { size: totems.length };
    }

    async findeTotemActivatedAmount(): Promise<any | undefined> {
        const totems = await this.totemRepository.find({ cancelado: false });

        return { size: totems.length };
    }
}
