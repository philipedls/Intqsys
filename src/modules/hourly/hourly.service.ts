import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hourlies } from 'src/models/hourly.models';
import { Repository } from 'typeorm';
import { HourlyCompanyDto } from './Dto/hourly.company.dto';
import { HourlyDto } from './Dto/hourly.dto';

@Injectable()
export class HourlyService {

    constructor(
        @InjectRepository(Hourlies)
        private hourlyRepository: Repository<Hourlies>
    ) { }

    async index(data: HourlyDto) {
        const hourly = await this.hourlyRepository.findOne({ hora: data.hora });
        return hourly;
    }

    findByUUID(id_horario: string): Promise<Hourlies> {
        return this.hourlyRepository.findOne({ id_horario: id_horario });
    }

    findByCompanyUUID(idCompany: string): Promise<Hourlies[]> {
        return this.hourlyRepository.find({ empresas_id_empresa: idCompany });
    }

    findByHours(hora: string): Promise<Hourlies> {
        return this.hourlyRepository.findOne({ hora: hora });
    }

    async storeCompanyHours(data: HourlyCompanyDto): Promise<Hourlies | undefined> {
        data.status = true;
        data.token = parseInt(Math.floor(9).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
        );
        const hourly = await this.hourlyRepository.create(data);
        return this.hourlyRepository.save(hourly);
    }

    async store(data: HourlyDto) {
        data.status = true;
        data.token = parseInt(Math.floor(9).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
        );
        const hourly = await this.hourlyRepository.create(data);
        return this.hourlyRepository.save(hourly);
    }
}
