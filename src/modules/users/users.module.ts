import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reports } from 'src/models/reports.models';
import { Users } from 'src/models/users.models';
import { AuthModule } from '../auth/auth.module';
import { ReportsModule } from '../reports/reports.module';
import { ReportsService } from '../reports/reports.service';
import { UserController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([Users, Reports]),],
  controllers: [UserController],
  exports: [UsersService],
  providers: [UsersService],
})
export class UsersModule { }
