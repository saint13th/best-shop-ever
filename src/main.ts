import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';

const httpsOptions = {
  key: fs.readFileSync('./secrets/create-cert-key.pem'),
  cert: fs.readFileSync('./secrets/create-cert.pem'),
};

async function bootstrap() {
  const port = 3000;
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true, https: httpsOptions }),
  );
  const swagDocumentConfig = new DocumentBuilder()
    .setTitle('BSE API')
    .setDescription('BSE API description')
    .setVersion('1.0')
    .addTag('bse')
    .build();
  const document = SwaggerModule.createDocument(app, swagDocumentConfig);

  fs.writeFileSync("./swagger-spec.json", JSON.stringify(document));

  SwaggerModule.setup('api', app, document);

  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  });
  app.setViewEngine({
    engine: {
      ejs: require('ejs'),
    },
    templates: join(__dirname, '..', 'views'),
    layout: 'layout/layout.ejs',
  });
  app.enableCors({
    origin: true,
  });

  await app.listen(port);
}

bootstrap().catch((error) => {
  Logger.log(error.message);
});
