import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queues } from 'src/models/queue.models';
import { Repository } from 'typeorm';
import { RankRegisterDto } from './Dto/rank.register.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class RankService {
    constructor(
        @InjectRepository(Queues)
        private queuesRepository: Repository<Queues>,
    ) { }

    async updateSituation(uid, situation) {
        const queueElement = await this.queuesRepository.findOne({ id_fila: uid });
        queueElement.situation = situation

        return this.queuesRepository.save(queueElement);
    }

    async findByDate(date: string): Promise<any[]> {
        const list = date.split('-');
        const day = Number(list[0]);
        const month = Number(list[1]);
        const queueList = Array<Queues>();
        const queueReponse = await this.queuesRepository.find();

        queueReponse.forEach((queue: Queues) => {
            if (
                queue.data_atendimento.getDate().toFixed() == day.toFixed() &&
                queue.data_atendimento.getMonth().toFixed() == month.toFixed()
            ) {
                queueList.push(queue);
            }
        });

        return queueList;
    }

    private genNumAndLetter(cont: number) {
        let randomNum = Math.round(Math.random() * cont);
        return randomNum
    }

    async notifyQueue(code: string, email: string, name: string, date: string, hour: string): Promise<any> {

        const transporter = nodemailer.createTransport({
            host: process.env.MAILER_SMTP_HOST,
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.SCHEDULER_EMAIL_ADDRES, // generated ethereal user
                pass: process.env.NODE_MAILER_SCHEDULER_PASS, // generated ethereal password
            },
        });

        return await transporter.sendMail({
            from: process.env.SCHEDULER_EMAIL_ADDRES, // sender address
            to: email, // list of receivers
            subject: "Intqsys - Fila", // Subject line
            text: `${name},
    
C??digo de confirma????o: ${code}
Data do atendimento: ${date.split('/')[1]}/${date.split('/')[0]}/${date.split('/')[2]}
Hor??rio do atendimento: ${hour}

Dados necess??rios:
*
*

N??o h?? necessidade de fazer check-in ou retirar ficha. Ao chegar, basta sentar e esperar a sua vez. Os ??ltimos quatro d??gitos do seu n??mero (${code.substring(code.length - 4, code.length)}) ser??o utilizados como sua ficha de atendimento.
Quando a sua vez chegar, voc?? ver?? o seu n??mero no monitor, al??m de receber uma notifica????o no celular.
            `, // plain text body
            // html body
        });
    }

    async store(data: RankRegisterDto, date: Date): Promise<any> {
        data.situation = 'WAITING'
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
    async findOneByServiceUUID(uid: string): Promise<Queues[] | undefined> {
        return this.queuesRepository.find({ servicos_id_servico: uid });
    }
}
