import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Paineis } from 'src/models/panels.models';
import { Repository } from 'typeorm';
import { PanelDto } from './Dto/panel.dto';
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
            const { codigo, titulo, status } = totemsResult[index];
            totems.push({
                codigo: codigo,
                titulo: titulo,
                status: status
            });
        }

        return totems;
    }

    store(data: PanelDto): Promise<Paineis> {
        data.codigo = Math.floor(9).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString();

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

    findePanelActivated(): Promise<any | undefined> {
        return this.panelRepository.find({ status: true, cancelado: false });
    }
}
