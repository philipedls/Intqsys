import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Paineis } from 'src/models/panels.models';
import { Repository } from 'typeorm';
import { PanelFetchDto } from './Dto/panel.fetch.dto';

@Injectable()
export class PanelService {

    constructor(
        @InjectRepository(Paineis)
        private panelRepository: Repository<Paineis>
    ) { }

    index(): Promise<Paineis[] | undefined> {
        return this.panelRepository.find();
    }

    store(data): Promise<Paineis[]> {
        const panel = this.panelRepository.create(data);
        return this.panelRepository.save(panel);
    }

    findOneByUUID(data: PanelFetchDto): Promise<Paineis | undefined> {
        return this.panelRepository.findOne({ id_painel: data.id_painel });
    }
}
