import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/models/users.models';
import { UserController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users]),],
  controllers: [UserController],
  exports: [UsersService],
  providers: [UsersService,],
})
export class UsersModule { }
