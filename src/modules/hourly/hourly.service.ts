import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SchedulesTimes } from 'src/models/schedules.times';
import { Hourlies } from 'src/models/hourly.models';
import { Repository } from 'typeorm';
import { HourlyCompanyDto } from './Dto/hourly.company.dto';
import { HourlyDto } from './Dto/hourly.dto';
import { ScheduleTimeDto } from './Dto/scheduler.time.dto';

@Injectable()
export class HourlyService {

    constructor(
        @InjectRepository(Hourlies)
        private hourlyRepository: Repository<Hourlies>,
        @InjectRepository(SchedulesTimes)
        private scheduleTimeRepository: Repository<SchedulesTimes>
    ) { }

    async index(data: HourlyDto) {
        const hourly = await this.hourlyRepository.findOne({ hora: data.hora });
        return hourly;
    }

    findByUUID(id_horario: string): Promise<Hourlies> {
        return this.hourlyRepository.findOne({ id_horario: id_horario });
    }

    findByServiceUUID(idCompany: string): Promise<Hourlies[]> {
        return this.hourlyRepository.find({ servicos_id_servico: idCompany });
    }

    findByHours(hora: string): Promise<Hourlies> {
        return this.hourlyRepository.findOne({ hora: hora });
    }

    findSchedulesTimesByeHourly(hourlyId: string) {
        return this.scheduleTimeRepository.find({ id_horario_marcado: hourlyId });
    }

    private generateToken(): string {
        return Math.floor(9).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString();
    }

    async storeCompanyHours(dataList: HourlyCompanyDto[], uid: string): Promise<Hourlies[] | undefined> {
        for (let index = 0; index < dataList.length; index++) {
            dataList[index].token = this.generateToken();
            const hourly = this.hourlyRepository.create(dataList[index]);
            await this.hourlyRepository.save(hourly)
        }

        return this.hourlyRepository.find({ servicos_id_servico: uid })
    }

    async store(data: HourlyDto) {
        data.status = true;
        data.token = this.generateToken();
        const hourly = await this.hourlyRepository.create(data);
        return this.hourlyRepository.save(hourly);
    }

    async storeScheduleTime(data: ScheduleTimeDto, date: Date) {
        const hourly = await this.hourlyRepository.findOne({ id_horario: data.horarios_id_horario });

        // if (hourly) {
        //     throw new HttpException('schedule time alredy exits', HttpStatus.CONFLICT);
        // }
        const scheduleTime = this.scheduleTimeRepository.create(
            {
                horarios_id_horario: data.horarios_id_horario,
                horario: hourly,
                data_atendimento: date
            }
        );

        return this.scheduleTimeRepository.save(scheduleTime);
    }
}
