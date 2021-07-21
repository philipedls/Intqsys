import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = {
    "origin": "*",  // attempted "origin":["http://localhost"]
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 200,
    "credentials": true,
    "allowedHeaders": "Content-Type, Accept, Authorization",

  }
  app.enableCors(options);

  const config = new DocumentBuilder()
    .setTitle('Intqsys API - Documentation')
    // .setDescription('The Intqsys API description <Interim>')
    .setVersion('1.0.0')
    .addTag('intqsys')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  await app.listen(3333);
}
bootstrap();
