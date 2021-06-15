import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Atttendances } from 'src/models/ attendances.models';
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

    async store(data: AttendanceDto): Promise<Atttendances | undefined> {
        const attendance = await this.attendanceService.create(data);
        return this.attendanceService.save(attendance);
    }
}
