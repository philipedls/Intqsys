import { Module } from '@nestjs/common';
import { CraftService } from './craft.service';
import { CraftController } from './craft.controller';
import { ReportsModule } from '../reports/reports.module';

@Module({
  imports: [ReportsModule],
  providers: [CraftService],
  controllers: [CraftController]
})
export class CraftModule { }
