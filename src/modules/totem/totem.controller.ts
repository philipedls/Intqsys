import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TotemFetchDto } from './Dto/totem.fetch.dto';
import { TotemService } from './totem.service';

@Controller('totem')
export class TotemController {
    constructor(
        private readonly totemService: TotemService
    ) { }


    // @UseGuards(JwtAuthGuard)
    @Post()
    indexOneTotem(@Body() body: TotemFetchDto) {
        return this.totemService.findOneByUUID(body);
    }

    // @UseGuards(JwtAuthGuard)
    @Get('amount')
    index() {
        return this.totemService.findeTotemAmount()
    }

    // @UseGuards(JwtAuthGuard)
    @Get('amount/activated')
    indexActivated() {
        return this.totemService.findeTotemActivatedAmount()
    }
}
