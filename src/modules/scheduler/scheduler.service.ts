import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedules } from 'src/models/schedules.models';
import { Repository } from 'typeorm';
import { SchedulerEntentyDto } from './dto/scheduler.ententy.dto';
import { SchedulerFetchDataDto } from './dto/scheduler.fetch.data.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class SchedulerService {

    constructor(
        @InjectRepository(Schedules)
        private schedulerRepository: Repository<Schedules>
    ) { }


    async findOneByUUID(data: SchedulerFetchDataDto): Promise<Schedules | undefined> {
        return this.schedulerRepository.findOne({ id_agendamento: data.id_agendamento });
    }

    async cancelScheduler(code: string, date: string) {
        const listParam = date.split('-');
        const scheduler = await this.schedulerRepository.findOne({ codigo: code });
        scheduler.cancelado = true;
        scheduler.data_cancelamento = new Date(Number(listParam[2]), Number(listParam[1]) - 1, Number(listParam[0]));

        return this.schedulerRepository.save(scheduler);
    }

    async findSheduleToday(): Promise<Schedules[] | undefined> {
        let schedules = new Array<Schedules>();

        let currentData = new Date();
        const list = await this.schedulerRepository.find({ status: true });
        // console.log(currentData);

        // console.log(currentData.getDate());

        list.forEach((scheduler) => {
            const date = scheduler.data_atendimento.getDate().toFixed();
            const date2 = currentData.getDate().toFixed();
            if (date == date2) {
                schedules.push(scheduler);
            }
        });
        // console.log(schedules);

        return schedules;
    }

    async findSheduleTodayAmount(): Promise<any | undefined> {
        let schedules = new Array<Schedules>();

        let currentData = new Date();
        const list = await this.schedulerRepository.find({ status: true });

        list.forEach((scheduler) => {
            const date = scheduler.data_atendimento.getDate().toFixed();
            const date2 = currentData.getDate().toFixed();
            if (date == date2) {
                schedules.push(scheduler);
            }
        });
        console.log(schedules.length);

        return { size: schedules.length };
    }

    async findSheduleCanceledAmount(): Promise<any | undefined> {
        let schedules = new Array<Schedules>();

        let currentData = new Date();
        const list = await this.schedulerRepository.find({ cancelado: true });

        list.forEach((scheduler) => {
            const date = scheduler.data_atendimento.getDate().toFixed();
            const date2 = currentData.getDate().toFixed();

            const month = scheduler.data_atendimento.getMonth().toFixed();
            const month2 = currentData.getMonth().toFixed();
            if (date == date2 && month == month2) {
                schedules.push(scheduler);
            }
        });

        return { size: schedules.length };
    }

    async findSchedulerByMonth(date: string) {

        const schedulers = Array();
        const list = await this.schedulerRepository.find();

        list.forEach((element) => {
            console.log(element.data_atendimento.getMonth().toFixed());
            if (date == element.data_atendimento.getFullYear().toFixed()) {
                schedulers.push(element);
            }
        });

        return schedulers;
    }

    async findSheduleSeparedByMonth(): Promise<any> {
        let schedules01 = new Array<Schedules>();
        let schedules02 = new Array<Schedules>();
        let schedules03 = new Array<Schedules>();
        let schedules04 = new Array<Schedules>();
        let schedules05 = new Array<Schedules>();
        let schedules06 = new Array<Schedules>();
        let schedules07 = new Array<Schedules>();
        let schedules08 = new Array<Schedules>();
        let schedules09 = new Array<Schedules>();
        let schedules10 = new Array<Schedules>();
        let schedules11 = new Array<Schedules>();
        let schedules12 = new Array<Schedules>();

        const list = await this.schedulerRepository.find({ status: true, cancelado: false });

        list.forEach((scheduler) => {
            const mes = scheduler.data_atendimento.getMonth();

            switch (mes) {
                case 0:
                    schedules01.push(scheduler);
                    break;

                case 1:
                    schedules02.push(scheduler);
                    break;

                case 2:
                    schedules03.push(scheduler);
                    break;

                case 3:
                    schedules04.push(scheduler);
                    break;

                case 4:
                    schedules05.push(scheduler);
                    break;

                case 5:
                    schedules06.push(scheduler);
                    break;

                case 6:
                    schedules07.push(scheduler);
                    break;

                case 7:
                    schedules08.push(scheduler);
                    break;

                case 8:
                    schedules09.push(scheduler);
                    break;

                case 9:
                    schedules10.push(scheduler);
                    break;

                case 10:
                    schedules11.push(scheduler);
                    break;

                case 11:
                    schedules12.push(scheduler);
                    break;

                default:
                    break;
            }
        });

        return {
            Ja: schedules01,
            Fe: schedules02,
            Ma: schedules03,
            Ap: schedules04,
            Mai: schedules05,
            Ju: schedules06,
            Jul: schedules07,
            Au: schedules08,
            Se: schedules09,
            Oc: schedules10,
            No: schedules11,
            De: schedules12
        };
    }

    async findSheduleCanceled(date: string): Promise<Schedules[] | undefined> {
        const day = date.split('-')[0];
        const month = date.split('-')[1];
        const year = date.split('-')[2];
        const paramDate = new Date(Number(year), Number(month), Number(day));

        const canceledList = Array<Schedules>();
        const schedulers = await this.schedulerRepository.find({ cancelado: true });

        schedulers.forEach(scheduler => {
            if (scheduler.data_cancelamento.getDate() == paramDate.getDate() && scheduler.data_cancelamento.getMonth() == paramDate.getMonth()) {
                canceledList.push(scheduler);
            }
        });

        return canceledList;
    }

    async findOndeByDate(date: Date): Promise<Schedules[]> {
        const list = await this.schedulerRepository.find();
        const schedulers = Array<Schedules>();

        for (let index = 0; index < list.length; index++) {
            if (date.getDate() == list[index].data_atendimento.getDate() && date.getMonth() == list[index].data_atendimento.getMonth()) {
                schedulers.push(list[index]);
            }
        }

        return schedulers;
    }

    private genNumAndLetter(cont: number) {
        let randomNum = Math.round(Math.random() * cont);
        return randomNum
    }

    async notifyScheduler(code: string, email: string, name: string): Promise<any> {

        var letra_num = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'H', 'I', 'J', 'K', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        let a = letra_num[this.genNumAndLetter(letra_num.length)];
        let b = letra_num[this.genNumAndLetter(letra_num.length)];
        let c = letra_num[this.genNumAndLetter(letra_num.length)];
        let d = letra_num[this.genNumAndLetter(letra_num.length)];
        let e = letra_num[this.genNumAndLetter(letra_num.length)];

        const confirmationCode = a.concat(b, c, d, e);

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
            subject: "GoFila - Agendamento", // Subject line
            text: `${name},
    
Código de confirmação: ${confirmationCode}

Dados necessários:
*
*

Não há necessidade de fazer check-in ou retirar ficha. Ao chegar, basta sentar e esperar a sua vez. Os últimos quatro dígitos do seu número (${code.substring(code.length - 4, code.length)}) serão utilizados como sua ficha de atendimento.
Quando a sua vez chegar, você verá o seu número no monitor, além de receber uma notificação no celular.
            `, // plain text body
            // html body
        });
    }

    store(data: SchedulerEntentyDto, hours: number, min: number): Promise<Schedules> {
        let schedulerDate = new Date();
        const list = data.data.split('/');
        schedulerDate.setDate(Number(list[0]));
        schedulerDate.setMonth(Number(list[1]));
        schedulerDate.setFullYear(Number(list[2]));
        schedulerDate.setHours(hours, min)
        data.data_atendimento = schedulerDate;


        const scheduler = this.schedulerRepository.create(data);
        return this.schedulerRepository.save(scheduler);
    }

    storeWithoutHours(data: SchedulerEntentyDto, date: Date): Promise<Schedules> {
        data.data_atendimento = date;
        const scheduler = this.schedulerRepository.create(data);
        return this.schedulerRepository.save(scheduler);
    }
    async findSheduleTodayDate(date: string): Promise<Schedules[] | undefined> {
        const schedules = new Array<Schedules>();
        const dataList = date.split('-');

        const day = dataList[0];
        const monthParam = parseInt(dataList[1]).toFixed();
        // console.log(`${day}/${month}`);

        const currentData = new Date();

        const list = await this.schedulerRepository.find();

        list.forEach((scheduler) => {

            const date = scheduler.data_atendimento.getDate().toFixed();
            const date2 = currentData.getDate().toFixed();

            const month = (scheduler.data_atendimento.getMonth() + 1).toFixed();
            const month2 = currentData.getMonth().toFixed();

            console.log(`Currente Data: ${month} | Data Param: ${monthParam}`);
            if (date == day && month == monthParam) {
                schedules.push(scheduler);
            }
        });

        return schedules;
    }
}
