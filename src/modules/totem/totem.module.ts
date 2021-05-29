import { Module } from '@nestjs/common';
import { ReportsModule } from '../reports/reports.module';
import { TotemController } from './totem.controller';
import { TotemService } from './totem.service';

@Module({
  imports: [ReportsModule],
  controllers: [TotemController],
  exports: [TotemService],
  providers: [TotemService]
})
export class TotemModule { }
