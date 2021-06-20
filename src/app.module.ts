import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Atttendances } from './models/ attendances.models';
import { Avaliations } from './models/avaliations.models';
import { Charges } from './models/charges.models';
import { Companies } from './models/companies.models';
import { HourliesCanceleds } from './models/HourliesCanceleds';
import { Hourlies } from './models/hourly.models';
import { Licences } from './models/licences.models';
import { Paineis } from './models/panels.models';
import { Patients } from './models/patients.models';
import { Payments } from './models/payments.models';
import { Queues } from './models/queue.models';
import { Reports } from './models/reports.models';
import { Schedules } from './models/schedules.models';
import { Services } from './models/services.models';
import { Totems } from './models/totems.models';
import { Users } from './models/users.models';
import { AttendanceController } from './modules/attendance/attendance.controller';
import { AttendanceService } from './modules/attendance/attendance.service';
import { AuthModule } from './modules/auth/auth.module';
import { CompanyController } from './modules/company/company.controller';
import { CompanyService } from './modules/company/company.service';
import { CraftController } from './modules/craft/craft.controller';
import { CraftService } from './modules/craft/craft.service';
import { HourlyController } from './modules/hourly/hourly.controller';
import { HourlyService } from './modules/hourly/hourly.service';
import { PanelController } from './modules/panel/panel.controller';
import { PanelService } from './modules/panel/panel.service';
import { PatientController } from './modules/patient/patient.controller';
import { PatientService } from './modules/patient/patient.service';
import { RankController } from './modules/rank/rank.controller';
import { RankService } from './modules/rank/rank.service';
import { ReportsController } from './modules/reports/reports.controller';
import { ReportsService } from './modules/reports/reports.service';
import { SchedulerController } from './modules/scheduler/scheduler.controller';
import { SchedulerService } from './modules/scheduler/scheduler.service';
import { TotemController } from './modules/totem/totem.controller';
import { TotemService } from './modules/totem/totem.service';
import { UserController } from './modules/users/users.controller';
import { UsersService } from './modules/users/users.service';


@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION as any,
      url: process.env.TYPEORM_URL,
      // host: process.env.TYPEORM_HOST,
      // port: parseInt(process.env.TYPEORM_PORT),
      // username: process.env.TYPEORM_USERNAME,
      // password: process.env.TYPEORM_PASSWORD,
      // database: process.env.TYPEORM_DATABASE,
      entities:
        [
          Avaliations,
          Charges,
          Companies,
          Hourlies,
          HourliesCanceleds,
          Licences,
          Paineis,
          Patients,
          Payments,
          Schedules,
          Services,
          Totems,
          Users,
          Queues,
          Reports,
          Atttendances,
        ]
    }),
    TypeOrmModule.forFeature([Avaliations, Charges, Companies, Hourlies, HourliesCanceleds, Licences, Paineis, Patients, Payments, Schedules, Services, Totems, Users, Queues, Reports, Atttendances]),
  ],
  controllers: [AppController, UserController, CompanyController, PanelController, TotemController, SchedulerController, CraftController, PatientController, HourlyController, RankController, ReportsController, AttendanceController],
  providers: [AppService, UsersService, CompanyService, PanelService, TotemService, SchedulerService, CraftService, PatientService, HourlyService, RankService, ReportsService, AttendanceService],
})
export class AppModule { }
