import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patients } from 'src/models/patients.models';
import { Queues } from 'src/models/queue.models';
import { Schedules } from 'src/models/schedules.models';
import { Services } from 'src/models/services.models';
import { Repository } from 'typeorm';
import { CraftService } from '../craft/craft.service';
import { HourlyService } from '../hourly/hourly.service';
import { SchedulerService } from '../scheduler/scheduler.service';
import { PatientFechDto } from './Dto/patient.fetch.dto';
import { PatientFetchListDto } from './Dto/patient.fetch.list.dto';
import { PatientsDto } from './Dto/patients.dto';

@Injectable()
export class PatientService {

    constructor(
        @InjectRepository(Patients)
        private patientRepository: Repository<Patients>
    ) { }

    index(uid: string): Promise<Patients> {
        return this.patientRepository.findOne({ id_paciente: uid });
    }

    indexAllPatients() {
        return this.patientRepository.find();
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

    async finSchedulerToPatients(schedulers: Schedules[], services: Services[]): Promise<any> {
        const patientsQueue = Array();

        for (let index = 0; index < schedulers.length; index++) {
            const patient = await this.patientRepository.findOne({ id_paciente: schedulers[index].pacientes_id_paciente });

            patientsQueue.push({
                dados_paciente: patient,
                codigo_fila: schedulers[index].codigo,
                linha: services[index].titulo,
                fila: index + 1,
                status: 'Em tempo'
            });
        }

        patientsQueue.sort(function (a, b) {
            return (a.dados_paciente.paciente_nome > b.dados_paciente.paciente_nome) ? 1 : ((b.dados_paciente.paciente_nome > a.dados_paciente.paciente_nome) ? -1 : 0);
        });

        return patientsQueue;
    }

    async fetchQueueToPatients(queues: Queues[], services: CraftService, hourlyService: HourlyService,): Promise<any[]> {
        const patientsQueue = Array();

        for (let index = 0; index < queues.length; index++) {
            const patient = await this.patientRepository.findOne({ id_paciente: queues[index].pacientes_id_paciente });
            const hour = await hourlyService.findByUUID(queues[index].horarios_id_horario);
            const service = await services.findByUUID(queues[index].servicos_id_servico);

            patientsQueue.push({
                patient: patient,
                code: queues[index].codigo,
                position: queues[index].posicao,
                scheduler: hour?.hora == null ? '' : hour.hora,
                service: service.titulo,
                process: queues[index].tipo

            });
        }

        patientsQueue.sort(function (a, b) {
            return (a.position > b.position) ? 1 : ((b.position > a.position) ? -1 : 0);
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
