import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patients } from 'src/models/patients.models';
import { Repository } from 'typeorm';
import { PatientFechDto } from './Dto/patient.fetch.dto';
import { PatientFetchListDto } from './Dto/patient.fetch.list.dto';
import { PatientsDto } from './Dto/patients.dto';

@Injectable()
export class PatientService {

    constructor(
        @InjectRepository(Patients)
        private patientRepository: Repository<Patients>
    ) { }

    index(data: PatientFechDto): Promise<Patients> {
        return this.patientRepository.findOne({ id_paciente: data.id_paciente });
    }

    async indexByUUIDList(data: PatientFetchListDto): Promise<Patients[]> {
        // return this.patientRepository.findOne({ id_paciente: data.id_paciente });
        const patients = Array<Patients>();

        for (let index = 0; index < data.id_lista.length; index++) {
            const patient = await this.patientRepository.findOne({ id_paciente: data.id_lista[index] });
            patients.push(patient);
        }

        return patients;
    }

    async store(data: PatientsDto): Promise<Patients> {
        const value = await this.patientRepository.findOne({ paciente_email: data.paciente_email });

        if (value == null) {
            const patient = await this.patientRepository.create(data);
            return this.patientRepository.save(patient);
        }

        return value;
    }
}
