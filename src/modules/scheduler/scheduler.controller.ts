import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CraftService } from '../craft/craft.service';
import { HourlyDto } from '../hourly/Dto/hourly.dto';
import { HourlyService } from '../hourly/hourly.service';
import { PatientsDto } from '../patient/Dto/patients.dto';
import { PatientService } from '../patient/patient.service';
import { RankRegisterDto } from '../rank/Dto/rank.register.dto';
import { RankService } from '../rank/rank.service';
import { SchedulerEntentyDto } from './dto/scheduler.ententy.dto';
import { SchedulerFetchDataDto } from './dto/scheduler.fetch.data.dto';
import { PagesDto } from './dto/scheduler.queue.pages.dto';
import { SchedulerReciverDto } from './dto/scheduler.reciver.dto';
import { SchedulerService } from './scheduler.service';

@Controller('scheduler')
export class SchedulerController {
    constructor(
        private readonly schedulerService: SchedulerService,
        private patientSerivce: PatientService,
        private hourlyService: HourlyService,
        private craftService: CraftService,
        private queueService: RankService
    ) { }

    // // @UseGuards(JwtAuthGuard)
    // @Post()
    // index(@Body() body: SchedulerFetchDataDto) {
    //     return this.schedulerService.findOneByUUID(body);
    // }

    // // @UseGuards(JwtAuthGuard)
    // @Get('today')
    // indexByToday() {
    //     return this.schedulerService.findSheduleToday();
    // }

    // @Get('today/amount')
    // indexByTodayAmount() {
    //     return this.schedulerService.findSheduleTodayAmount();
    // }

    //  // @UseGuards(JwtAuthGuard)
    // @Get('month')
    // indexByMonth() {
    //     return this.schedulerService.findSheduleMonth();
    // }

    @UseGuards(JwtAuthGuard)
    @Get('canceled/:date')
    indexByCanceled(@Param() param) {
        return this.schedulerService.findSheduleCanceled(param.date);
    }

    // // @UseGuards(JwtAuthGuard)
    // @Get('canceled/amount')
    // indexByCanceledAmount() {
    //     return this.schedulerService.findSheduleCanceledAmount();
    // }

    // @UseGuards(JwtAuthGuard)
    @Post('add')
    async store(@Body() body: SchedulerReciverDto) {

        const listHours = body.hora.split(':');
        const list = body.data.split('/');
        // console.log(list);

        const day: number = Number(list[0]);
        const month: number = Number(list[1]);
        const year: number = Number(list[2]);

        // let dataConcat = `${day}/${month}/${year}`;
        // console.log(dataConcat);

        const schedulerDate = new Date(year, month - 1, day, Number(listHours[0]), Number(listHours[0]));

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

        const service = await this.craftService.findByUUID(body.id_servico);

        const schedulerData: SchedulerEntentyDto = {
            codigo: code,
            data: body.data,
            horarios_id_horario: hourly.id_horario,
            servicos_id_servico: service.id_servico,
            pacientes_id_paciente: patient.id_paciente,
            horario: hourly.hora,
            servico: service.titulo,
            paciente: patient.paciente_nome,
            empresas_id_empresa: body.id_empresa,
            status: true,
            cancelado: false,
            data_atendimento: null
        }

        const result = await this.schedulerService.storeWithoutHours(schedulerData, schedulerDate);
        const nofifyResponse = await this.schedulerService.notifyScheduler(result.codigo, patient.paciente_email, patient.paciente_nome);

        const queueElement: RankRegisterDto = {
            codigo: Math.floor(9).toString()
                + Math.floor(Math.random() * (10 + 1)).toString()
                + Math.floor(Math.random() * (10 + 1)).toString()
                + Math.floor(Math.random() * (10 + 1)).toString()
                + Math.floor(Math.random() * (10 + 1)).toString()
                + Math.floor(Math.random() * (10 + 1)).toString()
                + Math.floor(Math.random() * (10 + 1)).toString()
                + Math.floor(Math.random() * (10 + 1)).toString()
                + Math.floor(Math.random() * (10 + 1)).toString(),
            posicao: null,
            horarios_id_horario: hourly.id_horario ?? '',
            servicos_id_servico: service.id_servico ?? '',
            pacientes_id_paciente: patient.id_paciente ?? '',
            data_atendimento: result.data_atendimento,
            paciente: patient.paciente_nome ?? '',
            paciente_telefone: '',
            cancelado: false,
            data: body.data,
            id_servico: null,
            servico: service.titulo,
            status: true,
            tipo: 'Agendado',
            horario: hourly.hora
        };

        await this.queueService.store(queueElement, schedulerDate);

        return { result: result, notify: nofifyResponse }
    }

    // @UseGuards(JwtAuthGuard)
    @Get('patients/:date')
    async indexQueue(@Param() param, @Body() body: PagesDto) {
        const schedulers = await this.schedulerService.findSheduleTodayDate(param.date);
        const services = await this.craftService.findBySchedulerList(schedulers);
        return this.patientSerivce.finQueuePatients(schedulers, services);

        // return this.patientSerivce.fetchPagesQueue(queue, body.page, body.amount);
    }

    // @UseGuards(JwtAuthGuard)
    @Get(':date')
    async indexScheduler(@Param() param) {
        const schedulers = await this.schedulerService.findSheduleTodayDate(param.date);
        const services = await this.craftService.findBySchedulerList(schedulers);
        return this.patientSerivce.finSchedulerToPatients(schedulers, services);

        // return this.patientSerivce.fetchPagesQueue(queue, body.page, body.amount);
    }
    @UseGuards(JwtAuthGuard)
    @Put('cancel/:code')
    storeQueue(@Param() param, @Body() body) {
        return this.schedulerService.cancelScheduler(param.code, body.data);
    }
}
