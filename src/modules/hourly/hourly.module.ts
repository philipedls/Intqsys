import { Module } from '@nestjs/common';
import { HourlyService } from './hourly.service';
import { HourlyController } from './hourly.controller';


@Module({
  providers: [HourlyService],
  controllers: [HourlyController],
})
export class HourlyModule { }
