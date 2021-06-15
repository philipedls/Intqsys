import { Module } from '@nestjs/common';
import { AttendanceModule } from '../attendance/attendance.module';
import { CraftModule } from '../craft/craft.module';
import { HourlyModule } from '../hourly/hourly.module';
import { PatientModule } from '../patient/patient.module';
import { RankModule } from '../rank/rank.module';
import { ReportsModule } from '../reports/reports.module';
import { SchedulerController } from './scheduler.controller';
import { SchedulerService } from './scheduler.service';

@Module({
  imports: [HourlyModule, PatientModule, CraftModule, RankModule, ReportsModule, AttendanceModule],
  providers: [SchedulerService],
  controllers: [SchedulerController]
})
export class SchedulerModule { }
