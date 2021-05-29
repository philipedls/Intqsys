import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
    constructor(
        private readonly reportsService: ReportsService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get(':uid')
    index(@Param() param) {
        return this.reportsService.findByCompanyUUID(param.uid);
    }

}
