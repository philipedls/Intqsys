import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Services } from 'src/models/services.models';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReportsDto } from '../reports/Dto/reports.dto';
import { ReportsService } from '../reports/reports.service';
import { CraftService } from './craft.service';
import { ServicesDto } from './Dto/serivices.dto';
import { ServiceFetchDto } from './Dto/services.fetch.dto';

@Controller('service')
export class CraftController {

    constructor(
        private readonly craftService: CraftService,
        private reportService: ReportsService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get(':uid')
    findByUUID(@Param() param): Promise<Services[]> {
        return this.craftService.findByCompanyUUID(param.uid);
    }

    @UseGuards(JwtAuthGuard)
    @Post('add')
    async store(@Body() body: ServicesDto): Promise<Services> {
        const service = await this.craftService.store(body);
        if (service) {
            const report: ReportsDto = {
                autor_usuario: service.empresas_id_empresa,
                autor_cliente: null,
                id_cliente: null,
                codigo_acao: null,
                categoria: 'SERVIÇO',
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
        }

        return service;
    }
}
