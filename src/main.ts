import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
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
