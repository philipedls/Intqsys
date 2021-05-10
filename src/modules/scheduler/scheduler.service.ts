import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedules } from 'src/models/schedules.models';
import { Repository } from 'typeorm';
import { SchedulerReciveDto } from './dto/scheduler.recive.dto';
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
        const list = await this.schedulerRepository.find({ status: true });
        // console.log(currentData);

        // console.log(currentData.getDate());

        list.forEach((scheduler) => {
            const date = scheduler.data_atendimento.getDate().toFixed();
            const date2 = currentData.getDate().toFixed();
            if (date == date) {
                schedules.push(scheduler);
            }
        });
        // console.log(schedules);

        return schedules;
    }

    async findSheduleMonth(): Promise<Schedules[] | undefined> {
        let schedules = new Array<Schedules>();

        let currentData = new Date();
        const list = await this.schedulerRepository.find({ where: { status: true } });

        list.forEach((scheduler) => {
            if (scheduler.data_atendimento.getMonth = currentData.getMonth) {
                schedules.push(scheduler);
            }
        });

        console.log(schedules);

        return schedules;
    }

    store(body: SchedulerReciveDto): Promise<Schedules> {
        let schedulerDate = new Date();
        const list = body.data.split('/');
        schedulerDate.setDate(Number(list[0]));
        schedulerDate.setMonth(Number(list[1]));
        schedulerDate.setFullYear(Number(list[2]));
        // schedulerDate.setMonth = body;

        let schedulerObj = {
            codigo: body.codigo,
            data_atendimento: schedulerDate,
            status: body.status,
            cancelado: body.cancelado
        };
        const scheduler = this.schedulerRepository.create(schedulerObj);
        return this.schedulerRepository.save(scheduler);
    }
}
