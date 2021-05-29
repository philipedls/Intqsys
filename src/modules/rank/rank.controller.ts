import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
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
        private reportService: ReportsService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get(':date')
    async indexScheduler(@Param() param) {
        console.log(param.date);
        const queues = await this.rankService.findByDate(param.date);
        const queuedPatients = await this.patientService.fetchQueueToPatients(queues, this.craftServive, this.hourlyService);

        return { length: queuedPatients.length, list: queuedPatients };
    }

    // @UseGuards(JwtAuthGuard)
    @Post('add')
    async store(@Body() body: RankRegisterDto) {
        const list = body.data.split('/');

        const day: number = Number(list[0]);
        const month: number = Number(list[1]);
        const year: number = Number(list[2]);

        const schedulerDate = new Date(year, month, day);

        const patienteData: PatientsDto = {
            paciente_nome: '',
            paciente_cpf: '',
            paciente_telefone: body.paciente_telefone,
            paciente_email: '',
            cancelado: false
        }

        const patient = await this.patientService.store(patienteData);
        const service = await this.craftServive.findByUUID(body.id_servico);
        console.log(service.titulo);
        body.servicos_id_servico = service.id_servico;
        body.servico = service.titulo;
        body.tipo = 'Fila';
        body.paciente = patient.paciente_nome;
        body.pacientes_id_paciente = patient.id_paciente;
        body.data_atendimento = schedulerDate;
        body.status = true;
        body.cancelado = false;
        body.horario = '',
            body.codigo = Math.floor(9).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString();

        const report: ReportsDto = {
            autor_usuario: null,
            autor_cliente: patient.id_paciente,
            id_cliente: service.empresas_id_empresa,
            codigo_acao: null,
            categoria: 'USUÁRIO',
            operador: 'SERVIÇO',
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

        return this.rankService.store(body, schedulerDate);

    }
}
