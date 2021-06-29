import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Atttendances } from 'src/models/ attendances.models';
import { Hourlies } from 'src/models/hourly.models';
import { AttendanceService } from '../attendance/attendance.service';
import { AttendanceDto } from '../attendance/Dto/attendance.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CraftService } from '../craft/craft.service';
import { HourlyService } from '../hourly/hourly.service';
import { PatientsDto } from '../patient/Dto/patients.dto';
import { PatientService } from '../patient/patient.service';
import { ReportsDto } from '../reports/Dto/reports.dto';
import { ReportsService } from '../reports/reports.service';
import { RankRegisterDto } from './Dto/rank.register.dto';
import { RankService } from './rank.service';

@Controller('queue')
export class RankController {

    constructor(
        private readonly rankService: RankService,
        private patientService: PatientService,
        private craftServive: CraftService,
        private hourlyService: HourlyService,
        private reportService: ReportsService,
        private attendanceService: AttendanceService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get(':date')
    async indexScheduler(@Param() param) {
        console.log(param.date);
        const queues = await this.rankService.findByDate(param.date);
        const queuedPatients = await this.patientService.fetchQueueToPatients(queues, this.craftServive, this.hourlyService);

        return { length: queuedPatients.length, list: queuedPatients };
    }

    @UseGuards(JwtAuthGuard)
    @Post('situation/update/:uid')
    updateSituation(@Param() param, @Body() body) {
        return this.rankService.updateSituation(param.uid, body.situation);
    }

    // @UseGuards(JwtAuthGuard)
    @Post('add')
    async store(@Body() body: RankRegisterDto) {
        const list = body.data.split('/');

        const day: number = Number(list[0]);
        const month: number = Number(list[1]);
        const year: number = Number(list[2]);

        const schedulerDate = new Date(year, month, day);

        let hourly: Hourlies;
        const hourlies = await this.hourlyService.findByServiceUUID(body.id_servico);
        hourlies.map(hour => hour.id_horario == body.horarios_id_horario ? hourly = hour : null);

        if (hourly) {
            const patienteData: PatientsDto = {
                paciente_nome: body.paciente,
                paciente_cpf: body.paciente_cpf,
                paciente_telefone: body.paciente_telefone,
                paciente_email: body.paciente_email,
                cancelado: false
            }

            const patient = await this.patientService.store(patienteData);
            const service = await this.craftServive.findByUUID(body.id_servico);

            const attendanceData: AttendanceDto = {
                hora_inicio: null,
                hora_final: null,
                status: true
            };

            const attendance = await this.attendanceService.store(attendanceData);

            body.servicos_id_servico = service.id_servico;
            body.servico = service.titulo;
            body.tipo = 'Fila';
            body.paciente = patient.paciente_nome;
            body.pacientes_id_paciente = patient.id_paciente;
            body.data_atendimento = schedulerDate;
            body.status = true;
            body.cancelado = false;
            body.atendimentos_id_atendimento = attendance.id_atendimento

            const report: ReportsDto = {
                autor_usuario: null,
                autor_cliente: patient.id_paciente,
                id_cliente: service.empresas_id_empresa,
                codigo_acao: null,
                categoria: 'SERVIÇO',
                operador: null,
                cancelar: false,
                cadastrar: false,
                editar: false,
                login: false,
                logout: false,
                agendamento: false,
                fila: true,
                walkin: false,
                atendimento: false,
                observacao: null,
            };

            this.reportService.store(report);
            const queueElement = await this.rankService.store(body, schedulerDate);

            const notifyResponse = await this.rankService.notifyQueue(
                queueElement.codigo,
                patient.paciente_email,
                patient.paciente_nome,
                schedulerDate.toLocaleDateString('pt-BR'),
                body.horario
            );

            return { result: queueElement, notify: notifyResponse }
        }
        throw new HttpException('hourly undefined', HttpStatus.NO_CONTENT);
    }

    @UseGuards(JwtAuthGuard)
    @Get('attendance/:uid') // Service UID to fetch
    async indexAttendanceByService(@Param() param) {
        const attendances = new Array<Atttendances>();
        const schedulers = await this.rankService.findOneByServiceUUID(param.uid);

        console.log(schedulers);
        for (const scheduler of schedulers) {
            const attendance = await this.attendanceService.indexByUID(scheduler.atendimentos_id_atendimento);
            if (attendance) {
                attendances.push(attendance);
            }
        }

        return attendances;
    }
}
