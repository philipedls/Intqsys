import { Module } from '@nestjs/common';
import { HourlyService } from './hourly.service';


@Module({
  providers: [HourlyService],
})
export class HourlyModule { }
