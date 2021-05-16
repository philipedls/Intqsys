import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Companies } from 'src/models/companies.models';
import { Repository } from 'typeorm';
import { CompanyFetch } from './company.fetch';

@Injectable()
export class CompanyService {

    constructor(
        @InjectRepository(Companies)
        private companyRepository: Repository<Companies>
    ) { }

    index(): Promise<Companies[] | undefined> {
        return this.companyRepository.find();
    }


    async findOneByUUID(data: CompanyFetch): Promise<Companies | undefined> {
        return this.companyRepository.findOne({ id_empresa: data.id_empresa });
    }

    store(data) {
        const company = this.companyRepository.create(data);
        return this.companyRepository.save(company);
    }
}
