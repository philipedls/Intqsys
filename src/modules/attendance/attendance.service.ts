import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Atttendances } from 'src/models/ attendances.models';
import { Services } from 'src/models/services.models';
import { Repository } from 'typeorm';
import { AttendanceDto } from './Dto/attendance.dto';

@Injectable()
export class AttendanceService {
    constructor(
        @InjectRepository(Atttendances)
        private attendanceService: Repository<Atttendances>
    ) { }

    index(): Promise<Atttendances[] | undefined> {
        return this.attendanceService.find();
    }

    indexByUID(uid: string): Promise<Atttendances | undefined> {
        return this.attendanceService.findOne({ id_atendimento: uid });
    }

    indexByServiceUID(uid: string): Promise<Atttendances[] | undefined> {
        return this.attendanceService.find({ servicos_id_servico: uid });
    }

    indexCompletedByServiceUID(uid: string): Promise<Atttendances[] | undefined> {
        return this.attendanceService.find({ servicos_id_servico: uid, status: true });
    }

    async store(data: AttendanceDto): Promise<Atttendances | undefined> {
        const attendance = await this.attendanceService.create(data);
        return this.attendanceService.save(attendance);
    }

    async startAttendance(uid: string, hour: string, serviceID: string): Promise<Atttendances | undefined> {
        const attendance = await this.attendanceService.findOne({ id_atendimento: uid });
        attendance.hora_inicio = hour;
        attendance.servicos_id_servico = serviceID;
        return this.attendanceService.save(attendance);
    }

    async endAttendance(uid: string, hour: string): Promise<Atttendances | undefined> {
        const attendance = await this.attendanceService.findOne({ id_atendimento: uid });
        attendance.hora_final = hour;
        return this.attendanceService.save(attendance);
    }

    async timeAttendance(uid: string, time: string): Promise<Atttendances | undefined> {
        const attendance = await this.attendanceService.findOne({ id_atendimento: uid });
        attendance.tempo_atendimento = time;
        return this.attendanceService.save(attendance);
    }
}
