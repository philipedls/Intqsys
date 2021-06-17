import { Body, Controller, Param, Put } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
    constructor(
        private readonly attendanceService: AttendanceService
    ) { }

    @Put('initiate/:uid')
    initiateAttendance(@Param() param, @Body() body) {
        return this.attendanceService.startAttendance(param.uid, body.hora);
    }

    @Put('finalize/:uid')
    finalizeAttendance(@Param() param, @Body() body) {
        return this.attendanceService.endAttendance(param.uid, body.hora);
    }
}
