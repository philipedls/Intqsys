import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queues } from 'src/models/queue.models';
import { Repository } from 'typeorm';
import { CraftService } from '../craft/craft.service';
import { RankRegisterDto } from './Dto/rank.register.dto';

@Injectable()
export class RankService {
    constructor(
        @InjectRepository(Queues)
        private queuesRepository: Repository<Queues>
    ) { }

    async findByDate(date: string): Promise<any[]> {
        const list = date.split('-');
        const day = list[0];
        const month = Number(list[1]);
        // const currentDate = new Date(Number(list[0]), Number(list[1]) - 1, Number(list[2]));
        // console.log(currentDate);
        const queueList = Array<Queues>();
        const queueReponse = await this.queuesRepository.find();

        queueReponse.forEach((queue: Queues) => {
            console.log(queue.data_atendimento.getMonth().toFixed());
            console.log(month.toFixed());
            if (
                queue.data_atendimento.getDate().toFixed() == day &&
                queue.data_atendimento.getMonth().toFixed() == month.toFixed()
            ) {
                queueList.push(queue);
            }
        });

        return queueList;
    }
    async store(data, date: Date): Promise<any> {
        const rankList = Array<Queues>();

        const ranks = await this.queuesRepository.find();

        ranks.forEach((queue) => {
            if (queue.data_atendimento.getDate().toFixed() == date.getDate().toFixed() && queue.data_atendimento.getMonth().toFixed() == data.data_atendimento.getMonth().toFixed()) {
                rankList.push(queue);
            }
        });

        if (rankList.length == 0) {
            data.posicao = 1;
            const queue = this.queuesRepository.create(data);
            return this.queuesRepository.save(queue);
        }

        data.posicao = rankList.length + 1
        const queue = this.queuesRepository.create(data);
        return this.queuesRepository.save(queue);

    }
}
