import { Module } from '@nestjs/common';
import { CraftModule } from '../craft/craft.module';
import { HourlyModule } from '../hourly/hourly.module';
import { PatientModule } from '../patient/patient.module';
import { ReportsModule } from '../reports/reports.module';
import { RankController } from './rank.controller';
import { RankService } from './rank.service';

@Module({
  imports: [PatientModule, CraftModule, HourlyModule, ReportsModule],
  controllers: [RankController],
  providers: [RankService],
})
export class RankModule { }
