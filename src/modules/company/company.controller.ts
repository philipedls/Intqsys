import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReportsDto } from '../reports/Dto/reports.dto';
import { ReportsService } from '../reports/reports.service';
import { CompanyFetch } from './company.fetch';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
    constructor(
        private readonly companyService: CompanyService,
        private reportService: ReportsService
    ) { }


    // @UseGuards(JwtAuthGuard)
    @Post('fetch')
    index(@Body() body: CompanyFetch) {
        return this.companyService.findOneByUUID(body);
    }

    // @UseGuards(JwtAuthGuard)
    @Get('all')
    indexAll() {
        return this.companyService.index();
    }

    // @UseGuards(JwtAuthGuard)
    @Post()
    async store(@Body() body) {
        const company = await this.companyService.store(body);

        if (company != null) {
            const report: ReportsDto = {
                autor_usuario: body.id_empresa,
                autor_cliente: null,
                id_cliente: null,
                codigo_acao: null,
                categoria: 'USUÁRIO',
                operador: null,
                cancelar: false,
                cadastrar: true,
                editar: false,
                login: false,
                logout: false,
                agendamento: false,
                fila: false,
                walkin: false,
                atendimento: false,
                observacao: null,
            };

            this.reportService.store(report);
        }
        return company;
    }

}
