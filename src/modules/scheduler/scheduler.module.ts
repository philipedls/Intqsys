import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { SchedulerController } from './scheduler.controller';

@Module({
  providers: [SchedulerService],
  controllers: [SchedulerController]
})
export class SchedulerModule {}
