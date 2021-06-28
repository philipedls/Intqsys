import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { DeskService } from './desk.service';
import { DeskDto } from './Dto/desk.dto';

@Controller('desk')
export class DeskController {
    constructor(
        private readonly deskService: DeskService
    ) { }

    @Post('add')
    store(@Body() body: DeskDto) {
        return this.deskService.store(body);
    }

    @Delete('delete/:uid')
    deleteDesk(@Param() param) {
        return this.deskService.erease(param.uid);
    }
}
