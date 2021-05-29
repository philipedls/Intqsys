import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { ReportsModule } from '../reports/reports.module';

@Module({
  imports: [ReportsModule],
  providers: [PatientService],
  controllers: [PatientController]
})
export class PatientModule { }
