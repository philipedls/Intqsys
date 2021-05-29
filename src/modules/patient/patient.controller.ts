import { Body, Controller, Post } from '@nestjs/common';
import { ReportsDto } from '../reports/Dto/reports.dto';
import { ReportsService } from '../reports/reports.service';
import { PatientFechDto } from './Dto/patient.fetch.dto';
import { PatientFetchListDto } from './Dto/patient.fetch.list.dto';
import { PatientsDto } from './Dto/patients.dto';
import { PatientService } from './patient.service';

@Controller('patient')
export class PatientController {
    constructor(
        private readonly patientService: PatientService,
        private reportService: ReportsService
    ) { }

    // @UseGuards(JwtAuthGuard)
    @Post()
    index(@Body() body: PatientFechDto) {
        return this.patientService.index(body)
    }

    // @UseGuards(JwtAuthGuard)
    @Post('list')
    indexByIDList(@Body() body: PatientFetchListDto) {
        return this.patientService.indexByUUIDList(body);
    }

    // @UseGuards(JwtAuthGuard)
    @Post('add')
    async store(@Body() body: PatientsDto) {
        const patient = await this.patientService.store(body);
        if (patient != null) {
            const report: ReportsDto = {
                autor_usuario: null,
                autor_cliente: patient.id_paciente,
                id_cliente: null,
                codigo_acao: null,
                categoria: 'USUÁRIO',
                operador: 'CADASTRADO',
                cancelar: false,
                cadastrar: true,
                editar: false,
                login: true,
                logout: false,
                agendamento: false,
                fila: false,
                walkin: false,
                atendimento: false,
                observacao: null,
            };
        }

        return patient;
    }
}
