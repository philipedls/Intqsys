import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Services } from 'src/models/services.models';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CraftService } from './craft.service';
import { ServicesDto } from './Dto/serivices.dto';
import { ServiceFetchDto } from './Dto/services.fetch.dto';

@Controller('service')
export class CraftController {

    constructor(
        private readonly craftService: CraftService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get(':uid')
    findByUUID(@Param() param): Promise<Services[]> {
        return this.craftService.findByCompanyUUID(param.uid);
    }

    @UseGuards(JwtAuthGuard)
    @Post('add')
    store(@Body() body: ServicesDto): Promise<Services> {
        return this.craftService.store(body);
    }
}
