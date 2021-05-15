import { Module } from '@nestjs/common';
import { HourlyModule } from '../hourly/hourly.module';
import { PatientModule } from '../patient/patient.module';
import { SchedulerController } from './scheduler.controller';
import { SchedulerService } from './scheduler.service';

@Module({
  imports: [HourlyModule, PatientModule],
  providers: [SchedulerService],
  controllers: [SchedulerController]
})
export class SchedulerModule { }
