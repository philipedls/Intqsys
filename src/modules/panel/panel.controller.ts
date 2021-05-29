import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { Paineis } from "src/models/panels.models";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { PanelDto } from "./Dto/panel.dto";
import { PanelFetchDto } from "./Dto/panel.fetch.dto";
import { PanelService } from "./panel.service";


@Controller('panel')
export class PanelController {
    constructor(
        private readonly panelService: PanelService
    ) { }

    // @UseGuards(JwtAuthGuard)
    // @Get()
    // index(): Promise<any[]> {
    //     return this.panelService.index();
    // }

    @UseGuards(JwtAuthGuard)
    @Post()
    indexByUUID(@Body() body: PanelFetchDto): Promise<Paineis> {
        return this.panelService.findOneByUUID(body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('add')
    store(@Body() body: PanelDto) {
        return this.panelService.store(body);
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
