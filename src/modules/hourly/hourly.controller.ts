import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import * as moment from 'moment';
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
    indexByCompany(@Param() param): Promise<Hourlies[]> {
        return this.hourlyService.findByCompanyUUID(param.uid);
    }

    // @UseGuards(JwtAuthGuard)
    @Post('add/:uid')
    storeCompanyHour(@Param() param, @Body() body: HourlyAttendanceDto) {
        const allHours = new Array();
        const hoursMorning = (parseInt(body.horario_atendimento_manha.split('-')[1]) - parseInt(body.horario_atendimento_manha.split('-')[0])) * 60;
        const attendance = hoursMorning / parseInt(body.tempo_atendimento);
        console.log(parseInt(body.tempo_atendimento));
        console.log(moment(body.horario_atendimento_manha.split('-')[0], 'hh:mm').add(parseInt(body.tempo_atendimento), 'minutes').format('hh:mm'));

        for (let index = 0; index < attendance; index++) {
            if (index == 0) {
                allHours.push(
                    moment(body.horario_atendimento_manha.split('-')[0], 'hh:mm').add(0, 'minutes').format('hh:mm')
                );
            } else {
                const hour = moment(`${allHours[index - 1]}`, 'hh:mm').add(parseInt(body.tempo_atendimento), 'minutes').format('hh:mm');
                console.log(hour);
                // console.log(hour);
                allHours.push(hour);
            }
        }

        const hourlies = Array<HourlyCompanyDto>();

        allHours.forEach(hour => {
            hourlies.push({
                hora: hour,
                empresas_id_empresa: param.uid,
                status: true,
                token: null
            });
        });


        return this.hourlyService.storeCompanyHours(hourlies, param.uid);
    }
}
