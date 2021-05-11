import { UseGuards, Request, Patch, Param, ValidationPipe } from '@nestjs/common';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Users } from 'src/models/users.models';
import { UsersService } from './users.service';
import { UsersSignUpDto } from './users.signup';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersFetchUUIDDto } from './Dto/users.fetch';
import { UsersRecoveryDto } from './Dto/users.recovery';
import { ChangePasswordDto } from '../auth/dto/changes.password.dto';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UsersService,
        private authService: AuthService
    ) { }

    // @UseGuards(JwtAuthGuard)
    // @Get()
    // index(): Promise<Users[]> {
    //     return this.userService.index();
    // }

    // @UseGuards(JwtAuthGuard)
    @Post()
    index(@Body() body: UsersFetchUUIDDto): Promise<Users> {
        return this.userService.findOneByUUID(body);
    }

    @Post('signup')
    signup(@Body() body: UsersSignUpDto) {
        return this.userService.store(body);
    }

    @UseGuards(AuthGuard('local'))
    @Post('signin')
    async signin(@Request() req) {
        return this.authService.authSignIn(req.user);
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
        @Body(ValidationPipe) changePasswordDto: ChangePasswordDto,
    ): Promise<{ message: string }> {
        await this.authService.resetPassword(token, changePasswordDto);

        return {
            message: 'Senha alterada com sucesso',
        };
    }
}

