import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedules } from 'src/models/schedules.models';
import { Repository } from 'typeorm';
import { SchedulerEntentyDto } from './dto/scheduler.ententy.dto';
import { SchedulerFetchDataDto } from './dto/scheduler.fetch.data.dto';

@Injectable()
export class SchedulerService {

    constructor(
        @InjectRepository(Schedules)
        private schedulerRepository: Repository<Schedules>
    ) { }


    async findOneByUUID(data: SchedulerFetchDataDto): Promise<Schedules | undefined> {
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
            if (date == date2) {
                schedules.push(scheduler);
            }
        });
        // console.log(schedules);

        return schedules;
    }

    async findSheduleTodayAmount(): Promise<any | undefined> {
        let schedules = new Array<Schedules>();

        let currentData = new Date();
        const list = await this.schedulerRepository.find({ status: true });

        list.forEach((scheduler) => {
            const date = scheduler.data_atendimento.getDate().toFixed();
            const date2 = currentData.getDate().toFixed();
            if (date == date2) {
                schedules.push(scheduler);
            }
        });
        console.log(schedules.length);

        return { size: schedules.length };
    }

    async findSheduleCanceledAmount(): Promise<any | undefined> {
        let schedules = new Array<Schedules>();

        let currentData = new Date();
        const list = await this.schedulerRepository.find({ cancelado: true });

        list.forEach((scheduler) => {
            const date = scheduler.data_atendimento.getDate().toFixed();
            const date2 = currentData.getDate().toFixed();
            if (date == date2) {
                schedules.push(scheduler);
            }
        });
        console.log(schedules.length);

        return { size: schedules.length };
    }

    async findSheduleMonth(): Promise<any> {
        let schedules01 = new Array<Schedules>();
        let schedules02 = new Array<Schedules>();
        let schedules03 = new Array<Schedules>();
        let schedules04 = new Array<Schedules>();
        let schedules05 = new Array<Schedules>();
        let schedules06 = new Array<Schedules>();
        let schedules07 = new Array<Schedules>();
        let schedules08 = new Array<Schedules>();
        let schedules09 = new Array<Schedules>();
        let schedules10 = new Array<Schedules>();
        let schedules11 = new Array<Schedules>();
        let schedules12 = new Array<Schedules>();

        const list = await this.schedulerRepository.find({ status: true, cancelado: false });


        // console.log(currentData.getDate());

        list.forEach((scheduler) => {
            const mes = scheduler.data_atendimento.getMonth();

            switch (mes) {
                case 1:
                    schedules01.push(scheduler);
                    break;

                case 2:
                    schedules02.push(scheduler);
                    break;

                case 3:
                    schedules03.push(scheduler);
                    break;

                case 4:
                    schedules04.push(scheduler);
                    break;

                case 5:
                    schedules05.push(scheduler);
                    break;

                case 6:
                    schedules06.push(scheduler);
                    break;

                case 7:
                    schedules07.push(scheduler);
                    break;

                case 8:
                    schedules08.push(scheduler);
                    break;

                case 9:
                    schedules09.push(scheduler);
                    break;

                case 10:
                    schedules10.push(scheduler);
                    break;

                case 11:
                    schedules11.push(scheduler);
                    break;

                case 12:
                    schedules12.push(scheduler);
                    break;

                default:
                    break;
            }
        });
        // console.log(schedules);

        return {
            Ja: schedules01,
            Fe: schedules02,
            Ma: schedules03,
            Ap: schedules04,
            Mai: schedules05,
            Ju: schedules06,
            Jul: schedules07,
            Au: schedules08,
            Se: schedules09,
            Oc: schedules10,
            No: schedules11,
            De: schedules12
        };
    }

    async findSheduleCanceled(): Promise<Schedules[] | undefined> {

        return await this.schedulerRepository.find({ cancelado: true });
    }

    async findOndeByDate(date: Date): Promise<Schedules[]> {
        const list = await this.schedulerRepository.find();
        const schedulers = Array<Schedules>();

        for (let index = 0; index < list.length; index++) {
            if (date.getDate() == list[index].data_atendimento.getDate() && date.getMonth() == list[index].data_atendimento.getMonth()) {
                schedulers.push(list[index]);
            }
        }

        return schedulers;
    }

    store(data: SchedulerEntentyDto, hours: number, min: number): Promise<Schedules> {
        let schedulerDate = new Date();
        const list = data.data.split('/');
        schedulerDate.setDate(Number(list[0]));
        schedulerDate.setMonth(Number(list[1]) - 1);
        schedulerDate.setFullYear(Number(list[2]));
        schedulerDate.setHours(hours, min)
        data.data_atendimento = schedulerDate;


        const scheduler = this.schedulerRepository.create(data);
        return this.schedulerRepository.save(scheduler);
    }
}
