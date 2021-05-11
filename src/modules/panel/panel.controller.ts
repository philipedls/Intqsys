import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { PanelFetchDto } from "./panel.fetch";
import { PanelService } from "./panel.service";


@Controller('panel')
export class PanelController {
    constructor(
        private readonly panelService: PanelService
    ) { }


    // @UseGuards(JwtAuthGuard)
    @Post()
    index(@Body() body: PanelFetchDto) {
        return this.panelService.findOneByUUID(body);
    }

    // @UseGuards(JwtAuthGuard)
    // @Post()
    // store(@Body() body) {
    //     const company = this.companyRepository.create(body);
    //     return this.companyRepository.save(company);
    // }

}
