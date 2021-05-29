import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TotemDto } from './Dto/totem.dto';
import { TotemFetchDto } from './Dto/totem.fetch.dto';
import { TotemService } from './totem.service';

@Controller('totem')
export class TotemController {
    constructor(
        private readonly totemService: TotemService
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
    store(@Body() body: TotemDto) {
        return this.totemService.store(body);
    }

}
