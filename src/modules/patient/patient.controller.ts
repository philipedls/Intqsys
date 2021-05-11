import { Body, Controller, Post } from '@nestjs/common';
import { PatientFechDto } from './Dto/patient.fetch.dto';
import { PatientFetchListDto } from './Dto/patient.fetch.list.dto';
import { PatientsDto } from './Dto/patients.dto';
import { PatientService } from './patient.service';

@Controller('patient')
export class PatientController {
    constructor(
        private readonly patientService: PatientService
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
    store(@Body() body: PatientsDto) {
        return this.patientService.store(body)
    }
}
