import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { HourlyDto } from '../hourly/Dto/hourly.dto';
import { HourlyService } from '../hourly/hourly.service';
import { PatientsDto } from '../patient/Dto/patients.dto';
import { PatientService } from '../patient/patient.service';
import { SchedulerEntentyDto } from './dto/scheduler.ententy.dto';
import { SchedulerFetchDataDto } from './dto/scheduler.fetch.data.dto';
import { SchedulerReciverDto } from './dto/scheduler.reciver.dto';
import { SchedulerService } from './scheduler.service';

@Controller('scheduler')
export class SchedulerController {
    constructor(
        private readonly schedulerService: SchedulerService,
        private patientSerivce: PatientService,
        private hourlyService: HourlyService,
    ) { }

    // @UseGuards(JwtAuthGuard)
    @Post()
    index(@Body() body: SchedulerFetchDataDto) {
        return this.schedulerService.findOneByUUID(body);
    }

    // @UseGuards(JwtAuthGuard)
    @Get('today')
    indexByToday() {
        return this.schedulerService.findSheduleToday();
    }

    @Get('today/amount')
    indexByTodayAmount() {
        return this.schedulerService.findSheduleTodayAmount();
    }

    // @UseGuards(JwtAuthGuard)
    @Get('month')
    indexByMonth() {
        return this.schedulerService.findSheduleMonth();
    }

    // @UseGuards(JwtAuthGuard)
    @Get('canceled')
    indexByCanceled() {
        return this.schedulerService.findSheduleCanceled();
    }

    // @UseGuards(JwtAuthGuard)
    @Get('canceled/amount')
    indexByCanceledAmount() {
        return this.schedulerService.findSheduleCanceledAmount();
    }

    // @UseGuards(JwtAuthGuard)
    @Post('add')
    async store(@Body() body: SchedulerReciverDto) {

        const listHours = body.hora.split(':');

        const schedulerDate = new Date();
        const list = body.data.split('/');
        schedulerDate.setDate(Number(list[0]));
        schedulerDate.setMonth(Number(list[1]) - 1);
        schedulerDate.setFullYear(Number(list[2]));
        schedulerDate.setHours(Number(listHours[0]), Number(listHours[1]));

        const schedulers = await this.schedulerService.findOndeByDate(schedulerDate);

        if (schedulers != null) {
            for (let index = 0; index < schedulers.length; index++) {
                let valueHours = await this.hourlyService.findByUUID(schedulers[index].horarios_id_horario);

                if (valueHours.hora == body.hora) {
                    throw new HttpException('Scheduler already exists', HttpStatus.CONFLICT);
                }
            }

        }

        const hourlyData: HourlyDto = {
            hora: body.hora,
            status: true,
            token: null
        };

        const hourly = await this.hourlyService.store(hourlyData);

        const patienteData: PatientsDto = {
            paciente_nome: body.paciente_nome,
            paciente_cpf: body.paciente_cpf,
            paciente_telefone: body.paciente_telefone,
            paciente_email: body.paciente_email,
            cancelado: false
        }

        const patient = await this.patientSerivce.store(patienteData);

        const code = Math.floor(9).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString();

        const schedulerData: SchedulerEntentyDto = {
            codigo: code,
            data: body.data,
            horarios_id_horario: hourly.id_horario,
            servicos_id_servico: body.id_servico,
            pacientes_id_paciente: patient.id_paciente,
            empresas_id_empresa: body.id_empresa,
            status: true,
            cancelado: false,
            data_atendimento: null
        }
        const result = await this.schedulerService.store(schedulerData, Number(listHours[0]), Number(listHours[1]));
        const nofifyResponse = await this.schedulerService.notifyScheduler(result.codigo, patient.paciente_email, patient.paciente_nome);

        return { result: result, notify: nofifyResponse }
    }

    // @UseGuards(JwtAuthGuard)
    @Get('queue/:date')
    async indexQueue(@Param() param) {
        const schedulers = await this.schedulerService.findSheduleTodayDate(param.date);
        // return this.schedulerService.findSheduleToday();

        return this.patientSerivce.finQueuePatients(schedulers);
    }
    // @UseGuards(JwtAuthGuard)
    // @Post()
    // storeQueue(@Body() body) {
    //     return this.queueService.store(body);
    // }
}
