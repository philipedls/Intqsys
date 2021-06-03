import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reports } from 'src/models/reports.models';
import { Repository } from 'typeorm';
import { ReportsDto } from './Dto/reports.dto';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Reports)
        private reportsService: Repository<Reports>,
    ) { }

    async store(data: ReportsDto) {
        const report = await this.reportsService.create(data);
        return this.reportsService.save(report);
    }

    findByCompanyUUID(uid: string) {
        return this.reportsService.find({ id_cliente: uid });
    }

    findByUserUUID(uid: string) {
        return this.reportsService.find({ autor_usuario: uid });
    }
}
