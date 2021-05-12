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

    async index(): Promise<any[]> {
        const totems = Array();
        const totemsResult = await this.panelRepository.find();

        for (let index = 0; index < totemsResult.length; index++) {
            const { id_painel, titulo, status } = totemsResult[index];
            totems.push({
                id_painel: id_painel,
                titulo: titulo,
                status: status
            });
        }

        return totems;
    }

    store(data): Promise<Paineis[]> {
        const panel = this.panelRepository.create(data);
        return this.panelRepository.save(panel);
    }

    findOneByUUID(data: PanelFetchDto): Promise<Paineis | undefined> {
        return this.panelRepository.findOne({ id_painel: data.id_painel });
    }

    async findePanelAmount(): Promise<any | undefined> {
        const totems = await this.panelRepository.find();

        return { size: totems.length };
    }

    async findePanelActivatedAmount(): Promise<any | undefined> {
        const totems = await this.panelRepository.find({ cancelado: false });

        return { size: totems.length };
    }
}
