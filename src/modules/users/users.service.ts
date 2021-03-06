import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Reports } from 'src/models/reports.models';
import { Users } from 'src/models/users.models';
import { Repository } from 'typeorm';
import { ReportsDto } from '../reports/Dto/reports.dto';
import { UsersFetchUUIDDto } from './Dto/users.fetch';
import { UsersSignUpDto } from './Dto/users.signup';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>,
        @InjectRepository(Reports)
        private reportRepository: Repository<Reports>
    ) { }

    async storeReport(data: ReportsDto) {
        const report = await this.reportRepository.create(data);
        return this.reportRepository.save(report);
    }

    async indexByCompanyUID(uid: string): Promise<Users[]> {
        return this.userRepository.find({ empresas_id_empresa: uid });
    }

    async signOut(data: ReportsDto) {
        const report = await this.reportRepository.create(data);
        return this.reportRepository.save(report);
    }

    async store(data: UsersSignUpDto) {
        data.status = true;
        const user = await this.userRepository.findOne({ email: data.email });

        if (!user) {
            data.senha = bcrypt.hashSync(data.senha, 8)
            return this.userRepository.save(data)
                .then((res) => {
                    const { senha, ...result } = res;
                    return {
                        status: true,
                        // mensagem: "Usuário cadastrado com sucesso",
                        result: result
                    }
                })
                .catch((error) => {
                    return {
                        status: false,
                        // mensagem: "Houve um errro ao cadastrar o usuário",
                        result: error
                    }
                });
        }

        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);

    }

    async update(data) {

        return this.userRepository.save(data)
            .then((result) => {
                return {
                    status: true,
                    // mensagem: "Dados atualizados com sucesso",
                    result: result
                }
            })
            .catch((error) => {
                return {
                    status: false,
                    // mensagem: "Houve um errro ao atulizar o usuário",
                    result: error
                }
            });
    }

    async findOneByEmail(email: string): Promise<Users | undefined> {
        return this.userRepository.findOne({ email: email });
    }

    async findOneByUUID(data: UsersFetchUUIDDto): Promise<Users | undefined> {
        return this.userRepository.findOne({ id_usuario: data.user_id });
    }

    async findOneByRecoverToken(token: string) {
        return this.userRepository.findOne({ token_recuperar_senha: token });
    }

    async changePassword(user: Users, password: string) {
        // const user = await this.userRepository.findOne({ id_usuario: id }); 
        user.senha = bcrypt.hashSync(password, 8);
        user.token_recuperar_senha = null;
        return this.userRepository.save(user);
    }
}
