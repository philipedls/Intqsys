import { HttpModule, Module } from '@nestjs/common';
import { AttendanceModule } from '../attendance/attendance.module';
import { CraftModule } from '../craft/craft.module';
import { HourlyModule } from '../hourly/hourly.module';
import { PatientModule } from '../patient/patient.module';
import { ReportsModule } from '../reports/reports.module';
import { RankController } from './rank.controller';
import { RankService } from './rank.service';

@Module({
  imports: [PatientModule, CraftModule, HourlyModule, ReportsModule, HttpModule, AttendanceModule],
  controllers: [RankController],
  providers: [RankService],
})
export class RankModule { }
