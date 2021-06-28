import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Atttendances } from 'src/models/ attendances.models';
import { Hourlies } from 'src/models/hourly.models';
import { AttendanceService } from '../attendance/attendance.service';
import { AttendanceDto } from '../attendance/Dto/attendance.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CraftService } from '../craft/craft.service';
import { ScheduleTimeDto } from '../hourly/Dto/scheduler.time.dto';
import { HourlyService } from '../hourly/hourly.service';
import { PatientsDto } from '../patient/Dto/patients.dto';
import { PatientService } from '../patient/patient.service';
import { RankRegisterDto } from '../rank/Dto/rank.register.dto';
import { RankService } from '../rank/rank.service';
import { ReportsDto } from '../reports/Dto/reports.dto';
import { ReportsService } from '../reports/reports.service';
import { SchedulerEntentyDto } from './dto/scheduler.ententy.dto';
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
        private queueService: RankService,
        private reportService: ReportsService,
        private attendanceService: AttendanceService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get('fetch/:uid')
    index(@Param() param) {
        return this.schedulerService.findOneByServiceUUID(param.uid);
    }

    @UseGuards(JwtAuthGuard)
    @Get('month')
    indexSeparedtedByMonth(@Param() param) {
        return this.schedulerService.findSheduleSeparedByMonth();
    }

    @UseGuards(JwtAuthGuard)
    @Get('year/:year')
    indexByMonth(@Param() param) {
        console.log(param.year);
        return this.schedulerService.findSchedulerByYear(param.year);
    }

    @UseGuards(JwtAuthGuard)
    @Get('canceled/fetch/:date')
    indexByCanceled(@Param() param, @Body() body) {
        return this.schedulerService.findSheduleCanceled(param.date);
    }

    @UseGuards(JwtAuthGuard)
    @Get('canceled/:year')
    indexAllCanceled(@Param() param, @Body() body) {
        return this.schedulerService.findSheduleCanceledsByYear(param.year);
    }

    // @UseGuards(JwtAuthGuard)
    @Post('add')
    async store(@Body() body: SchedulerReciverDto) {

        const listHours = body.hora.split(':');
        const list = body.data.split('/');

        const day: number = Number(list[0]);
        const month: number = Number(list[1]);
        const year: number = Number(list[2]);

        const schedulerDate = new Date(year, month, day, Number(listHours[0]), Number(listHours[0]));

        let hourly: Hourlies;
        const hourlies = await this.hourlyService.findByServiceUUID(body.id_servico);
        hourlies.map(hour => hour.id_horario == body.id_horario ? hourly = hour : null);

        if (hourly) {
            const patienteData: PatientsDto = {
                paciente_nome: body.paciente_nome,
                paciente_cpf: body.paciente_cpf,
                paciente_telefone: body.paciente_telefone,
                paciente_email: body.paciente_email,
                cancelado: false
            }

            const patient = await this.patientSerivce.store(patienteData);

            const service = await this.craftService.findByUUID(body.id_servico);

            const attendanceData: AttendanceDto = {
                hora_inicio: hourly?.hora,
                hora_final: null,
                status: true
            };

            const attendance = await this.attendanceService.store(attendanceData);

            const schedulerData: SchedulerEntentyDto = {
                codigo: body.codigo,
                data: body.data,
                horarios_id_horario: hourly.id_horario,
                servicos_id_servico: service.id_servico,
                pacientes_id_paciente: patient.id_paciente,
                horario: hourly?.hora,
                servico: service.titulo,
                paciente: patient.paciente_nome,
                empresas_id_empresa: body.id_empresa,
                status: true,
                cancelado: false,
                data_atendimento: null,
                situation: 'WAITING',
            }

            const scheduleResulto = await this.schedulerService.storeDefault(schedulerData, schedulerDate);
            const nofifyResponse = await this.schedulerService.notifyScheduler(
                scheduleResulto.codigo,
                patient.paciente_email,
                patient.paciente_nome,
                schedulerDate.toLocaleDateString('pt-BR'),
                hourly.hora
            );

            const queueElement: RankRegisterDto = {
                codigo: body.codigo,
                posicao: null,
                horarios_id_horario: hourly?.id_horario ?? '',
                servicos_id_servico: service.id_servico ?? '',
                pacientes_id_paciente: patient.id_paciente ?? '',
                paciente_email: patient.paciente_email ?? '',
                paciente_cpf: patient.paciente_cpf ?? '',
                data_atendimento: scheduleResulto.data_atendimento,
                paciente: patient.paciente_nome ?? '',
                paciente_telefone: '',
                cancelado: false,
                data: body.data,
                id_servico: null,
                servico: service.titulo,
                status: true,
                tipo: 'Agendado',
                horario: hourly?.hora,
                situation: 'WAITING',
                atendimentos_id_atendimento: attendance.id_atendimento
            };

            const report: ReportsDto = {
                autor_usuario: null,
                autor_cliente: patient.id_paciente,
                id_cliente: body.id_empresa,
                codigo_acao: null,
                categoria: 'SERVICO',
                operador: service.titulo.toUpperCase(),
                cancelar: false,
                cadastrar: false,
                editar: false,
                login: false,
                logout: false,
                agendamento: true,
                fila: false,
                walkin: false,
                atendimento: false,
                observacao: null,
            };


            const scheduleTime: ScheduleTimeDto = {
                status: true,
                hora: hourly?.hora,
                horarios_id_horario: hourly?.id_horario,

            };

            const response = await this.hourlyService.storeScheduleTime(scheduleTime, schedulerDate);

            console.log(response);

            this.reportService.store(report);

            await this.queueService.store(queueElement, schedulerDate);

            return { result: scheduleResulto, notify: nofifyResponse }
        }

        throw new HttpException('hourly undefined', HttpStatus.NO_CONTENT);
    }

    // @UseGuards(JwtAuthGuard)
    @Get('patients/:date')
    async indexQueue(@Param() param, @Body() body: PagesDto) {
        const schedulers = await this.schedulerService.findSheduleTodayDate(param.date);
        const services = await this.craftService.findBySchedulerList(schedulers);
        return this.patientSerivce.finQueuePatients(schedulers, services);

        // return this.patientSerivce.fetchPagesQueue(queue, body.page, body.amount);
    }

    @UseGuards(JwtAuthGuard)
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
