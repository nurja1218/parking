import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import bodyParserErrorHandler from 'express-body-parser-error-handler';
import compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Parking Lot API')
    .setDescription('The parking lot API description')
    .setVersion('1.0')
    .addTag('parking')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.use(
    bodyParserErrorHandler({
      onError: (err, req, _) => {
        console.error(err);
        console.log('Bad request body: ', req.body);
      },
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use(compression());

  await app.listen(3000);
}
bootstrap();
