import { Body, Controller, Get, Param, Patch, Post, Request, UnauthorizedException, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Users } from 'src/models/users.models';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReportsDto } from '../reports/Dto/reports.dto';
import { UsersFetchUUIDDto } from './Dto/users.fetch';
import { UsersRecoveryDto } from './Dto/users.recovery';
import { UsersSignUpDto } from './Dto/users.signup';
import { UserRole } from './user-roles.enum';
import { UsersService } from './users.service';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UsersService,
        private authService: AuthService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get(':uid')
    indexByCompanyID(@Param() param): Promise<Users[]> {
        return this.userService.indexByCompanyUID(param.uid);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    index(@Body() body: UsersFetchUUIDDto): Promise<Users> {
        return this.userService.findOneByUUID(body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('signup')
    async signup(@Body(ValidationPipe) body: UsersSignUpDto) {
        body.role = UserRole.USER;
        const signupObj = await this.userService.store(body);

        if (signupObj != null) {
            const report: ReportsDto = {
                autor_usuario: signupObj.result.id_usuario,
                autor_cliente: null,
                id_cliente: signupObj.result.empresas_id_empresa,
                codigo_acao: null,
                categoria: 'USUÁRIO',
                operador: 'CADASTRO',
                cancelar: false,
                cadastrar: true,
                editar: false,
                login: false,
                logout: false,
                agendamento: false,
                fila: false,
                walkin: false,
                atendimento: false,
                observacao: null,
            };

            this.userService.storeReport(report);
        }

        return signupObj;
    }

    @UseGuards(AuthGuard('local'))
    @Post('signin')
    async signin(@Request() req) {
        const access_token = await this.authService.authSignIn(req.user);

        const { token, token_recuperar_senha, ...result } = req.user

        if (result) {
            const { empresas_id_empresa, id_usuario } = result;
            const report: ReportsDto = {
                autor_usuario: empresas_id_empresa,
                autor_cliente: null,
                id_cliente: id_usuario,
                codigo_acao: null,
                categoria: 'USUÁRIO',
                operador: 'LOGIN',
                cancelar: false,
                cadastrar: false,
                editar: false,
                login: true,
                logout: false,
                agendamento: false,
                fila: false,
                walkin: false,
                atendimento: false,
                observacao: null,
            };
            this.userService.storeReport(report);
        }

        return {
            access_token: access_token,
            data: result
        }
    }

    // @UseGuards(AuthGuard('local'))
    // @Post('auth/admin/signin')
    // async adminSignin(@Request() req) {
    //     return this.authServbice.authSignIn(req.user);
    // }

    @Post('send-recover-email')
    async sendRecoverPasswordEmail(@Body() body: UsersRecoveryDto): Promise<void> {
        return await this.authService.sendRecoverPasswordEmail(body);
    }

    @Patch('/reset-password/:token')
    async resetPassword(
        @Param('token') token: string,
        @Body() changePasswordDto,
    ): Promise<{ message: string }> {
        await this.authService.resetPassword(token, changePasswordDto);

        return {
            message: 'Senha alterada'
        };
    }

    // ADMIN ROUTERS

    // @UseGuards(AuthGuard('admin'))
    @Post('admin/signup')
    adminSignup(@Body(ValidationPipe) body: UsersSignUpDto) {
        body.role = UserRole.ADMIN;
        return this.userService.store(body);
    }

    @UseGuards(AuthGuard('local'))
    @Post('admin/signin')
    async adminSignin(@Request() req) {
        const { token, token_recuperar_senha, role, ...result } = req.user

        if (role == UserRole.USER) throw new UnauthorizedException('User is not admin');

        const access_token = await this.authService.authSignIn(req.user);
        return {
            access_token: access_token,
            data: result
        }
    }
}

