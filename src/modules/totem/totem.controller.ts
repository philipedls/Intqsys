import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReportsDto } from '../reports/Dto/reports.dto';
import { ReportsService } from '../reports/reports.service';
import { TotemDto } from './Dto/totem.dto';
import { TotemFetchDto } from './Dto/totem.fetch.dto';
import { TotemService } from './totem.service';

@Controller('totem')
export class TotemController {
    constructor(
        private readonly totemService: TotemService,
        private reportService: ReportsService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    index() {
        return this.totemService.index();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    indexOneTotem(@Body() body: TotemFetchDto) {
        return this.totemService.findOneByUUID(body);
    }

    // @UseGuards(JwtAuthGuard)
    @Put('disable/:uid')
    deactivationTotem(@Param() param) {
        return this.totemService.disable(param.uid);
    }

    // @UseGuards(JwtAuthGuard)
    @Put('activate/:uid')
    activationTotem(@Param() param) {
        return this.totemService.activate(param.uid);
    }

    @UseGuards(JwtAuthGuard)
    @Get('amount')
    indexAmount() {
        return this.totemService.findeTotemAmount()
    }

    @UseGuards(JwtAuthGuard)
    @Get('activated')
    indexActivated() {
        return this.totemService.findeTotemActivatedAmount()
    }

    @UseGuards(JwtAuthGuard)
    @Post('add')
    async store(@Body() body: TotemDto) {
        const totem = await this.totemService.store(body);

        if (totem != null) {
            const report: ReportsDto = {
                autor_usuario: totem.empresas_id_empresa,
                autor_cliente: null,
                id_cliente: null,
                codigo_acao: null,
                categoria: 'TOTEM',
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

        return totem;
    }

}
