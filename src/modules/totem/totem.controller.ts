import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TotemFetchDto } from './totem.fetch';
import { TotemService } from './totem.service';

@Controller('totem')
export class TotemController {
    constructor(
        private readonly totemService: TotemService
    ) { }


    // @UseGuards(JwtAuthGuard)
    @Post()
    index(@Body() body: TotemFetchDto) {
        return this.totemService.findOneByUUID(body);
    }
}
