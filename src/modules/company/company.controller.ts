import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CompanyFetch } from './company.fetch';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
    constructor(
        private readonly companyService: CompanyService
    ) { }


    // @UseGuards(JwtAuthGuard)
    @Post()
    index(@Body() body: CompanyFetch) {
        return this.companyService.findOneByUUID(body);
    }

    // @UseGuards(JwtAuthGuard)
    @Post()
    store(@Body() body) {
       
        return this.companyService.store(body);
    }

}
