import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Companies } from 'src/models/companies.models';
import { Repository } from 'typeorm';

@Controller('company')
export class CompanyController {

    constructor(
        @InjectRepository(Companies)
        private companyRepository: Repository<Companies>
    ) { }

    @Get()
    index() {
        return this.companyRepository.find();
    }

    @Post()
    store(@Body() body) {
        const company = this.companyRepository.create(body);
        return this.companyRepository.save(company);
    }

}
