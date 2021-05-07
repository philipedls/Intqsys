import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

@Module({
    // imports: [TypeOrmModule.forFeature([Users])],
    controllers: [CompanyController],
    exports: [CompanyService],
    providers: [CompanyService]
})
export class CompanyModule { }
