import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedules } from 'src/models/schedules.models';
import { Repository } from 'typeorm';
import { ScheduleFetchDto } from './schedule.fetch';

@Injectable()
export class SchedulerService {

    constructor(
        @InjectRepository(Schedules)
        private schedulerRepository: Repository<Schedules>
    ) { }


    async findOneByUUID(data: ScheduleFetchDto): Promise<Schedules | undefined> {
        return this.schedulerRepository.findOne({ id_agendamento: data.id_agendamento });
    }

    async findSheduleToday(): Promise<Schedules[] | undefined> {
        let schedules = new Array<Schedules>();

        let currentData = new Date();
        const list = await this.schedulerRepository.find({ where: { status: true } });

        list.forEach((scheduler) => {
            if (scheduler.data_atendimento.getDate() == currentData.getDate()) {
                schedules.push(scheduler);
            }
        });

        return schedules;
    }

    store(body): Promise<Schedules[]> {
        let scheduler = this.schedulerRepository.create(body);
        return this.schedulerRepository.save(scheduler);
    }
}
