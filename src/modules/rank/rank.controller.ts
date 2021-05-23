import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CraftService } from '../craft/craft.service';
import { HourlyService } from '../hourly/hourly.service';
import { PatientsDto } from '../patient/Dto/patients.dto';
import { PatientService } from '../patient/patient.service';
import { RankRegisterDto } from './Dto/rank.register.dto';
import { RankServiceDto } from './Dto/rank.service.dto';
import { RankService } from './rank.service';

@Controller('queue')
export class RankController {

    constructor(
        private readonly rankService: RankService,
        private patientService: PatientService,
        private craftServive: CraftService,
        private hourlyService: HourlyService
    ) { }

    @Get(':date')
    async indexScheduler(@Param() param) {
        console.log(param.date);
        const queues = await this.rankService.findByDate(param.date);
        const queuedPatients = await this.patientService.fetchQueueToPatients(queues, this.craftServive, this.hourlyService);

        return { length: queuedPatients.length, data: queuedPatients };
    }

    // @UseGuards(JwtAuthGuard)
    @Post('add')
    async store(@Body() body: RankRegisterDto) {
        const list = body.data.split('/');

        const day: number = Number(list[0]);
        const month: number = Number(list[1]);
        const year: number = Number(list[1]);

        const schedulerDate = new Date(year, month - 1, day);

        const patienteData: PatientsDto = {
            paciente_nome: '',
            paciente_cpf: '',
            paciente_telefone: body.paciente_telefone,
            paciente_email: '',
            cancelado: false
        }

        const patient = await this.patientService.store(patienteData);

        body.pacientes_id_paciente = patient.id_paciente;
        body.tipo = 'Fila';

        body.codigo = Math.floor(9).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString()
            + Math.floor(Math.random() * (10 + 1)).toString();


        return this.rankService.store(body, schedulerDate);

    }
}
