import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Paineis } from 'src/models/panels.models';
import { Repository } from 'typeorm';
import { PanelFetchDto } from './panel.fetch';

@Injectable()
export class PanelService {

    constructor(
        @InjectRepository(Paineis)
        private panelRepository: Repository<Paineis>
    ) { }


    async findOneByUUID(data: PanelFetchDto): Promise<Paineis | undefined> {
        return this.panelRepository.findOne({ id_painel: data.id_painel });
    }
}
