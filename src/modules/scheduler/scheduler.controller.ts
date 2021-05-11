import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SchedulerReciveDto } from './dto/scheduler.recive.dto';
import { ScheduleFetchDto } from './schedule.fetch';
import { SchedulerService } from './scheduler.service';

@Controller('scheduler')
export class SchedulerController {
    constructor(
        private readonly schedulerService: SchedulerService
    ) { }


    // @UseGuards(JwtAuthGuard)
    @Post()
    index(@Body() body: ScheduleFetchDto) {
        return this.schedulerService.findOneByUUID(body);
    }

    // @UseGuards(JwtAuthGuard)
    @Get('today')
    indexByToday() {
        return this.schedulerService.findSheduleToday();
    }

    @Get('today/amount')
    indexByTodayAmount() {
        return this.schedulerService.findSheduleTodayAmount();
    }

    // @UseGuards(JwtAuthGuard)
    @Get('month')
    indexByMonth() {
        return this.schedulerService.findSheduleMonth();
    }

    // @UseGuards(JwtAuthGuard)
    @Get('canceled')
    indexByCanceled() {
        return this.schedulerService.findSheduleCanceled();
    }

    // @UseGuards(JwtAuthGuard)
    @Get('canceled/amount')
    indexByCanceledAmount() {
        return this.schedulerService.findSheduleCanceledAmount();
    }

    // @UseGuards(JwtAuthGuard)
    @Post('add')
    store(@Body() body: SchedulerReciveDto) {
        return this.schedulerService.store(body);
    }
}
