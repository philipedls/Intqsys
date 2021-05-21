import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queues } from 'src/models/queue.models';
import { Repository } from 'typeorm';
import { RankRegisterDto } from './Dto/rank.register.dto';

@Injectable()
export class RankService {
    constructor(
        @InjectRepository(Queues)
        private queuesRepository: Repository<Queues>
    ) { }

    async store(data: RankRegisterDto, date: Date) {
        data.data_atendimento = date;
        data.status = true;
        data.cancelado = false;
        const rankList = Array<Queues>();

        const ranks = await this.queuesRepository.find();

        ranks.forEach((queue) => {
            if (queue.data_atendimento.getDate().toFixed() == date.getDate().toFixed() && queue.data_atendimento.getMonth().toFixed() == data.data_atendimento.getMonth().toFixed()) {
                rankList.push(queue);
            }
        });

        if (rankList.length == 0) {
            data.posicao = 1;
            const scheduler = this.queuesRepository.create(data);
            return this.queuesRepository.save(scheduler);
        }

        data.posicao = rankList.length + 1
        const scheduler = this.queuesRepository.create(data);
        return this.queuesRepository.save(scheduler);

    }
}
