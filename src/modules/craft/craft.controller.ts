import { Body, Controller, Post } from '@nestjs/common';
import { Services } from 'src/models/services.models';
import { CraftService } from './craft.service';
import { ServicesDto } from './Dto/serivices.dto';
import { ServiceFetchDto } from './Dto/services.fetch.dto';

@Controller('service')
export class CraftController {

    constructor(
        private readonly craftService: CraftService
    ) { }

    // @UseGuards(JwtAuthGuard)
    @Post()
    findByUUID(@Body() body: ServiceFetchDto): Promise<Services[]> {
        return this.craftService.findByCompanyUUID(body);
    }

    // @UseGuards(JwtAuthGuard)
    @Post('add')
    store(@Body() body: ServicesDto): Promise<Services> {
        return this.craftService.store(body);
    }
}
