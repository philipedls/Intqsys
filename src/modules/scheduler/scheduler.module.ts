import { Module } from '@nestjs/common';
import { CraftModule } from '../craft/craft.module';
import { HourlyModule } from '../hourly/hourly.module';
import { PatientModule } from '../patient/patient.module';
import { SchedulerController } from './scheduler.controller';
import { SchedulerService } from './scheduler.service';

@Module({
  imports: [HourlyModule, PatientModule, CraftModule],
  providers: [SchedulerService],
  controllers: [SchedulerController]
})
export class SchedulerModule { }
