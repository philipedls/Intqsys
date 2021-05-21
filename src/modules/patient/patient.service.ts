import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patients } from 'src/models/patients.models';
import { Schedules } from 'src/models/schedules.models';
import { Services } from 'src/models/services.models';
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

    async finQueuePatients(schedulers: Schedules[], services: Services[]): Promise<any> {
        const patientsQueue = Array();

        for (let index = 0; index < schedulers.length; index++) {
            const patient = await this.patientRepository.findOne({ id_paciente: schedulers[index].pacientes_id_paciente });

            patientsQueue.push({
                dados_paciente: patient,
                codigo_fila: schedulers[index].codigo,
                linha: services[index].titulo,
                fila: index + 1,
                status: 'Agendamento'
            });
        }

        patientsQueue.sort(function (a, b) {
            return (a.dados_paciente.paciente_nome > b.dados_paciente.paciente_nome) ? 1 : ((b.dados_paciente.paciente_nome > a.dados_paciente.paciente_nome) ? -1 : 0);
        });

        return patientsQueue;
    }

    fetchPagesQueue(list: any[], pages: number, amount: number) {
        const pageList = Array();

        const result: number = list.length / amount;

        const limit = Number(result.toFixed());

        let counterPage = 1;

        let schedulerIndex = 0;

        let schedulers = Array();

        for (let pageIndex = 0; pageIndex < pages; pageIndex++) {

            for (; schedulerIndex < list.length; schedulerIndex++) {
                console.log(schedulerIndex != 0 && schedulerIndex % amount == 0);

                if (schedulerIndex != 0 && schedulerIndex % amount == 0) {
                    console.log(schedulers.length);
                    pageList.push({
                        page: counterPage,
                        data: schedulers
                    });

                    counterPage++;
                    schedulers = [];


                    if (counterPage == pages) {
                        break;
                    }
                }

                schedulers.push(list[schedulerIndex]);
            }
        }

        // while (counter <= limit) {
        //     const schedulers = Array();




        //     counter++;
        //     parts = parts + limit

        //     // for (let index = 0; index < pages; index) {

        //     //     const schedulers = Array();

        //     //     for (; schedulerIndex < amount; schedulerIndex++) {
        //     //         schedulers.push(list[schedulerIndex]);
        //     //     }

        //     //     pageList.push(
        //     //         {
        //     //             page: index,
        //     //             data: schedulers
        //     //         }
        //     //     );
        //     // }
        // }

        console.log(pageList.length);

        return pageList;

    }
}
