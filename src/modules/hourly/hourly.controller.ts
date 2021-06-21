import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import * as moment from 'moment';
import { timeEnd } from 'node:console';
import { Hourlies } from 'src/models/hourly.models';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { HourlyAttendanceDto } from './Dto/hourly.attendance.dto';
import { HourlyCompanyDto } from './Dto/hourly.company.dto';
import { HourlyDto } from './Dto/hourly.dto';
import { HourlyService } from './hourly.service';

@Controller('hourly')
export class HourlyController {
    constructor(
        private readonly hourlyService: HourlyService
    ) { }

    @Get(':uid')
    async indexByCompany(@Param() param, @Body() body): Promise<Hourlies[]> {
        const list = new Array<Hourlies>();
        const hourlies = await this.hourlyService.findByServiceUUID(param.uid);

        for (const hourly of hourlies) {
            const schedulesTime = await this.hourlyService.findSchedulesTimesByeHourly(hourly.id_horario);
            console.log(hourlies);

            // for (const time of schedulesTime) {
            //     if (hourly.id_horario != time.horarios_id_horario && time.data_atendimento.toLocaleDateString('pt-BR') == body.date) {
            //         list.push(hourly);
            //     }
            // }

            if(schedulesTime.length == 0) {
                list.push(hourly);
            }
        }
        return list;
    }

    // @UseGuards(JwtAuthGuard)
    @Post('add/:uid')
    storeCompanyHour(@Param() param, @Body() body: HourlyAttendanceDto) {
        const amountMinutes = (parseInt(body.horario_atendimento_manha.split('-')[1]) - parseInt(body.horario_atendimento_manha.split('-')[0])) * 60;
        const attendances = amountMinutes / parseInt(body.tempo_atendimento);
        const hourlies = Array<HourlyCompanyDto>();

        for (let index = 0; index < attendances; index++) {
            if (index == 0) {
                const hour = moment(body.horario_atendimento_manha.split('-')[0], 'hh:mm').add(0, 'minutes').format('hh:mm');
                hourlies.push({
                    hora: hour,
                    servicos_id_servico: param.uid,
                    status: true,
                    token: null
                });
            } else {
                const hour = moment(`${hourlies[index - 1].hora}`, 'hh:mm').add(parseInt(body.tempo_atendimento), 'minutes').format('hh:mm');
                hourlies.push({
                    hora: hour,
                    servicos_id_servico: param.uid,
                    status: true,
                    token: null
                });
            }
        }
        return this.hourlyService.storeCompanyHours(hourlies, param.uid);
    }
}
