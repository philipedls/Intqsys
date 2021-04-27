import { UseGuards, Request } from '@nestjs/common';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Users } from 'src/models/users.models';
import { UsersService } from './users.service';
import { UsersSignUpDto } from './users.signup';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UsersService,
        private authService: AuthService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    index(): Promise<Users[]> {
        return this.userService.index();
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
    //     return this.authService.authSignIn(req.user);
    // }

}

