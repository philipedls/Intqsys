import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hourlies } from 'src/models/hourly.models';
import { Repository } from 'typeorm';
import { HourlyDto } from './Dto/hourly.dto';

@Injectable()
export class HourlyService {

    constructor(
        @InjectRepository(Hourlies)
        private hourlyRepository: Repository<Hourlies>
    ) { }

    async store(data: HourlyDto) {
        data.status = true;
        data.token = parseInt(Math.floor(9).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
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
