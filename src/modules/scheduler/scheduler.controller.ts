import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ScheduleFetchDto } from './schedule.fetch';
import { SchedulerService } from './scheduler.service';

@Controller('scheduler')
export class SchedulerController {
    constructor(
        private readonly schedulerService: SchedulerService
    ) { }


    @UseGuards(JwtAuthGuard)
    @Post()
    index(@Body() body: ScheduleFetchDto) {
        return this.schedulerService.findOneByUUID(body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('today')
    indexByToday() {
        return this.schedulerService.findSheduleToday();
    }

    @UseGuards(JwtAuthGuard)
    @Post('store')
    store(@Body() body) {
        return this.schedulerService.store(body);
    }
}
