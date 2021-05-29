import { Module } from '@nestjs/common';
import { ReportsModule } from '../reports/reports.module';
import { PanelController } from './panel.controller';
import { PanelService } from './panel.service';

@Module({
    imports: [ReportsModule],
    controllers: [PanelController],
    exports: [PanelService],
    providers: [PanelService]
})
export class CompanyModule { }
