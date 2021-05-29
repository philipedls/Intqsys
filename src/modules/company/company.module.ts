import { Module } from '@nestjs/common';
import { ReportsModule } from '../reports/reports.module';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

@Module({
    imports: [ReportsModule],
    controllers: [CompanyController],
    exports: [CompanyService],
    providers: [CompanyService]
})
export class CompanyModule { }
