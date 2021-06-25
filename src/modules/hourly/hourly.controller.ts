import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import * as moment from 'moment';
import { Hourlies } from 'src/models/hourly.models';
import { HourlyAttendanceDto } from './Dto/hourly.attendance.dto';
import { HourlyCompanyDto } from './Dto/hourly.company.dto';
import { HourlyService } from './hourly.service';

@Controller('hourly')
export class HourlyController {
    constructor(
        private readonly hourlyService: HourlyService
    ) { }

    @Get('fetch/:uid')
    index(@Param() param) {
        return this.hourlyService.findByUUID(param.uid);
    }

    @Get(':uid')
    async indexByService(@Param() param, @Body() body): Promise<Hourlies[]> {
        const list = new Array<Hourlies>();
        const hourlies = await this.hourlyService.findByServiceUUID(param.uid);

        for (const hourly of hourlies) {
            const schedulesTime = await this.hourlyService.findSchedulesTimesByeHourly(hourly.id_horario);

            for (const time of schedulesTime) {
                const day = time.data_atendimento.getDate().toFixed();
                const month = time.data_atendimento.getDate().toFixed();
                const year = time.data_atendimento.getFullYear().toFixed();

                const date = day + '/' + month + '/' + year

                if (hourly.id_horario != time.horarios_id_horario && date == body.date) {
                    list.push(hourly);
                }
            }

            if (schedulesTime.length == 0) {
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
