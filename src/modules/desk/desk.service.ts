import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Desk } from 'src/models/desk.models';
import { DeleteResult, Repository } from 'typeorm';
import { DeskDto } from './Dto/desk.dto';

@Injectable()
export class DeskService {
    constructor(
        @InjectRepository(Desk)
        private deskRepository: Repository<Desk>
    ) { }

    store(data: DeskDto): Promise<Desk> {
        const desk = this.deskRepository.create(data);
        return this.deskRepository.save(desk);
    }

    erease(uid: string): Promise<DeleteResult> {
        // const desk = this.deskRepository.findOne({ id_guiche: uid });
        return this.deskRepository.delete({ id_guiche: uid });
    }
}
