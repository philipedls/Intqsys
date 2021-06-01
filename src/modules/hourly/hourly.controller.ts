import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Hourlies } from 'src/models/hourly.models';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { HourlyAttendanceDto } from './Dto/hourly.attendance.dto';
import { HourlyCompanyDto } from './Dto/hourly.company.dto';
import { HourlyDto } from './Dto/hourly.dto';
import { HourlyService } from './hourly.service';

@Controller('hourly')
export class HourlyController {
    constructor(
        private readonly hourlyService: HourlyService
    ) { }

    @Get(':uid')
    indexByCompany(@Param() param): Promise<Hourlies[]> {
        return this.hourlyService.findByCompanyUUID(param.uid);
    }

    // @UseGuards(JwtAuthGuard)
    @Post('add')
    storeCompanyHour(@Body() body: HourlyDto) {
        return this.hourlyService.store(body);
    }
}
