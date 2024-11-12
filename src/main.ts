import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppConfig } from './configs/configs-type';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });

  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Users example')
    .setDescription('The users API description')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      in: 'header',
      bearerFormat: 'JWT',
    })
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory, {
    swaggerOptions: {
      defaultModelsExpandDepth: 2,
      persistAuthorization: true,
      docExpansion: 'list',
    },
  });

  await app.listen(appConfig.port, () => {
    Logger.log(`Server started on ${appConfig.host}:${appConfig.port}`);
    Logger.log(`Swagger started on ${appConfig.host}:${appConfig.port}/docs`);
  });
}
bootstrap();
