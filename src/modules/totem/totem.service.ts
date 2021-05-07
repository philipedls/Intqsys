import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Totems } from 'src/models/totems.models';
import { Repository } from 'typeorm';
import { TotemFetchDto } from './totem.fetch';

@Injectable()
export class TotemService {

    constructor(
        @InjectRepository(Totems)
        private panelRepository: Repository<Totems>
    ) { }


    async findOneByUUID(data: TotemFetchDto): Promise<Totems | undefined> {
        return this.panelRepository.findOne({ id_totem: data.id_totem });
    }
}
