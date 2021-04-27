import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Avaliations } from './models/avaliations.models';
import { Charges } from './models/charges.models';
import { Companies } from './models/companies.models';
import { Hourlies } from './models/hourly.models';
import { Licences } from './models/licences.models';
import { Paineis } from './models/panels.models';
import { Patients } from './models/patients.models';
import { Payments } from './models/payments.models';
import { Schedules } from './models/schedules.models';
import { Services } from './models/services.models';
import { Totems } from './models/totems.models';
import { Users } from './models/users.models';
import { AuthModule } from './modules/auth/auth.module';
import { CompanyController } from './modules/company/company.controller';
import { UserController } from './modules/users/users.controller';
import { UsersService } from './modules/users/users.service';


@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION as any,
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [Avaliations, Charges, Companies, Hourlies, Licences, Paineis, Patients, Payments, Schedules, Services, Totems, Users]
    }),
    TypeOrmModule.forFeature([Avaliations, Charges, Companies, Hourlies, Licences, Paineis, Patients, Payments, Schedules, Services, Totems, Users]),

  ],
  controllers: [AppController, CompanyController, UserController],
  providers: [AppService, UsersService,],
})
export class AppModule { }
