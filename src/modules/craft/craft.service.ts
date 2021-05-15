import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Services } from 'src/models/services.models';
import { Repository } from 'typeorm';
import { ServicesDto } from './Dto/serivices.dto';
import { ServiceFetchDto } from './Dto/services.fetch.dto';

@Injectable()
export class CraftService {
    constructor(
        @InjectRepository(Services)
        private craftRepository: Repository<Services>
    ) { }

    findByCompanyUUID(data: ServiceFetchDto): Promise<Services[] | undefined> {
        return this.craftRepository.find({ empresas_id_empresa: data.id_empresa });
    }

    async store(data: ServicesDto): Promise<Services> {

        let flag: boolean = true;

        do {
            data.token = parseInt(Math.floor(9).toString()
                + Math.floor(Math.random() * (10 + 1)).toString()
                + Math.floor(Math.random() * (10 + 1)).toString()
                + Math.floor(Math.random() * (10 + 1)).toString()
                + Math.floor(Math.random() * (10 + 1)).toString()
                + Math.floor(Math.random() * (10 + 1)).toString()
                + Math.floor(Math.random() * (10 + 1)).toString()
                + Math.floor(Math.random() * (10 + 1)).toString()
                + Math.floor(Math.random() * (10 + 1)).toString()
            );
            const value = await this.craftRepository.findOne({ token: data.token });

            if (value == null) {
                flag = false;
            } else {
                flag = true;
            }
        } while (flag);

        const service = await this.craftRepository.create(data);
        return this.craftRepository.save(service);
    }

}
