import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import * as nodemailer from 'nodemailer';
import { Users } from 'src/models/users.models';
import { UsersRecoveryDto } from '../users/Dto/users.recovery';
import { UsersService } from '../users/users.service';
import { ChangePasswordDto } from './dto/changes.password.dto';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(username);
        if (user && bcrypt.compareSync(password, user.senha)) {
            const { senha, ...result } = user;
            return result;
        }
        return null;
    }

    // async validateAdmin(username: string, password: string): Promise<any> {
    //     const user = await this.usersService.findOneByEmail(username);
    //     console.log(user.role);
    //     if (user && bcrypt.compareSync(password, user.senha) && user.role == UserRole.ADMIN) {
    //         const { senha, ...result } = user;
    //         return result;
    //     }
    //     return null;
    // }

    async authSignIn(user: any) {
        const payload = { username: user.username, sub: user.userId, admin: false };

        return this.jwtService.sign(payload);
        // return {
        //     access_token: this.jwtService.sign(payload),
        // };
    }

    async adminSignIn(user: any) {
        const payload = { username: user.username, sub: user.userId, admin: true };

        return this.jwtService.sign(payload);
    }

    async changePassword(
        user: Users,
        changePasswordDto: ChangePasswordDto,
    ): Promise<void> {
        const { password, passwordConfirmation } = changePasswordDto;

        if (password != passwordConfirmation)
            throw new UnprocessableEntityException('Passwords do not match');

        await this.usersService.changePassword(user, password);
    }

    async resetPassword(
        recoverToken: string,
        changePasswordDto: ChangePasswordDto,
    ): Promise<void> {
        const user = await this.usersService.findOneByRecoverToken(recoverToken);
        if (!user) throw new NotFoundException('Invalid token!');

        try {
            await this.changePassword(user, changePasswordDto);
        } catch (error) {
            throw error;
        }
    }

    async sendRecoverPasswordEmail(body: UsersRecoveryDto): Promise<any> {
        const user = await this.usersService.findOneByEmail(body.email);

        if (!user)
            throw new NotFoundException('There is no user registered with this email');

        user.token_recuperar_senha = randomBytes(32).toString('hex');
        const tokenRecoverPassword = user.token_recuperar_senha;
        const response = await this.usersService.update(user);
        console.log(response);
        console.log(user.token_recuperar_senha);

        return tokenRecoverPassword;

        // const transporter = nodemailer.createTransport({
        //     host: process.env.MAILER_SMTP_HOST,
        //     port: 465,
        //     secure: true, // true for 465, false for other ports
        //     auth: {
        //         user: process.env.CONTACT_EMAIL_ADDRES, // generated ethereal user
        //         pass: process.env.NODE_MAILER_EM_PASS, // generated ethereal password
        //     },
        // });

        // return await transporter.sendMail({
        //     from: process.env.CONTACT_EMAIL_ADDRES, // sender address
        //     to: body.email, // list of receivers
        //     subject: "GoFila - Redefinição de senha", // Subject line
        //     text: `Oi ${user.nome}, tudo bem?`, // plain text body
        //     html: `<html>
        //     <body>
        //       <center>
        //         <div style="background-color: #d3d3d3; max-width: 840px; margin: 0; padding: 30px;">
        //           <h2 style="color: #292536; text-align: center">Solicitação de alteração de senha</h2>
        //           <p>Olá, ${user.nome}</p>
        //           <p>Você solicitou para redefinir sua senha de acesso ao GoFila. Para isso basta clicar no link abaixo para que você efetue essa alteração.</p>
        //           <div style="margin: 20px auto; width: 120px; padding: 10px 20px; background-color: #442d52; border-radius: 5px">
        //             <a href="http://localhost:3000/resetpassword/?token=${tokenRecoverPassword}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: #fcfcfc; font-size: 18px; margin: 0 auto;">Alterar Senha</a>
        //           </div>
        //           <p>Caso não foi você quem solicitou esta operação, pedimos que desconsidere este email.</p>
        //         </div>
        //       </center>
        //     </body>
        //   </html>`, // html body
        // });
    }
}
