import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.APP_PORT;
  const link_infor = process.env.linkgithub;
  app.setGlobalPrefix('v1/api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const config = new DocumentBuilder()
    .setTitle('Ecommerce Project') // Set the title of the API
    .setDescription('Ecommerce API description') // Set the description of the API
    .setVersion('0.1') // Set the version of the API
    .setBasePath('/v1/api')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build(); // Build the document
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swaggerui', app, document);
  Logger.log(`Check source at ${link_infor}`);
  Logger.log(`[server]: Server is running at http://localhost:${port}`);
  await app.listen(port ?? 3000);
}
bootstrap();
