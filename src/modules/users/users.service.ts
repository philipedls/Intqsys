import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/models/users.models';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>,
    ) { }

    async index(): Promise<Users[]> {
        return this.userRepository.find();
    }

    async store(data) {
        data.senha = bcrypt.hashSync(data.senha, 8)
        return this.userRepository.save(data)
            .then((result) => {
                return {
                    status: true,
                    mensagem: "Usuário cadastrado com sucesso",
                    result: result
                }
            })
            .catch((error) => {
                return {
                    status: false,
                    mensagem: "Houve um errro ao cadastrar o usuário",
                    result: error
                }
            });
    }

    async findOne(email: string): Promise<Users | undefined> {
        return this.userRepository.findOne({ email: email });
    }
}
