import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { Paineis } from "src/models/panels.models";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ReportsDto } from "../reports/Dto/reports.dto";
import { ReportsService } from "../reports/reports.service";
import { PanelDto } from "./Dto/panel.dto";
import { PanelFetchDto } from "./Dto/panel.fetch.dto";
import { PanelService } from "./panel.service";


@Controller('panel')
export class PanelController {
    constructor(
        private readonly panelService: PanelService,
        private reportService: ReportsService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get(':uid')
    index(@Param() param): Promise<any[]> {
        return this.panelService.indexByCompanyUID(param.uid);
    }

    // @UseGuards(JwtAuthGuard)
    @Put('disable/:uid')
    deactivationTotem(@Param() param) {
        return this.panelService.disable(param.uid);
    }

    // @UseGuards(JwtAuthGuard)
    @Put('activate/:uid')
    activationTotem(@Param() param) {
        return this.panelService.activate(param.uid);
    }


    @UseGuards(JwtAuthGuard)
    @Post('add')
    async store(@Body() body: PanelDto) {
        const panel = await this.panelService.store(body);

        if (panel != null) {
            const report: ReportsDto = {
                autor_usuario: panel.empresas_id_empresa,
                autor_cliente: null,
                id_cliente: null,
                codigo_acao: null,
                categoria: 'PAINEL',
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

        return panel;
    }

    @UseGuards(JwtAuthGuard)
    @Get('amount')
    indexAmount() {
        return this.panelService.findePanelAmount();
    }

    @UseGuards(JwtAuthGuard)
    @Get('activated')
    indexAmountActivated() {
        return this.panelService.findePanelActivated();
    }


}
