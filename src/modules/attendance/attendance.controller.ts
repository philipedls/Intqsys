import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CraftService } from '../craft/craft.service';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
    constructor(
        private readonly attendanceService: AttendanceService,
        private craftService: CraftService
    ) { }

    @Get(':uid')
    indexByService(@Param() param) {
        return this.attendanceService.indexByServiceUID(param.uid);
        // return this.attendanceService.index();
    }

    @Get('completed/:uid')
    indexCompletedByService(@Param() param) {
        return this.attendanceService.indexByServiceUID(param.uid);
    }

    @Put('initiate/:uid')
    async initiateAttendance(@Param() param, @Body() body) {
        const service = await this.craftService.findByUUID(body.id_servico);
        return this.attendanceService.startAttendance(param.uid, body.hora, service.id_servico);
    }

    @Put('finalize/:uid')
    finalizeAttendance(@Param() param, @Body() body) {
        return this.attendanceService.endAttendance(param.uid, body.hora);
    }

    @Put('time/:uid')
    updateTotalTomeAttendancd(@Param() param, @Body() body) {
        return this.attendanceService.timeAttendance(param.uid, body.time);
    }
}
