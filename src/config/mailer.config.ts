import { MailerOptions } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
// import * as path from 'path';

export const mailerConfig: MailerOptions = {
    // template: {
    //     dir: __dirname + 'templates',
    //     adapter: new HandlebarsAdapter(),
    //     options: {
    //         extName: '.hbs',
    //         layoutsDir: __dirname + 'templates',
    //     },
    // },
    transport: `smtps://philipe@sparkmobile.com.br:Superzon8594@mail.sparkmobile.com.br`,
};