import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from 'src/shared/components/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.APP_PORT;
  const link_infor = process.env.linkgithub;
  const link_swagger = 'swaggerui';
  app.setGlobalPrefix('v1/api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const document = SwaggerModule.createDocument(app, SwaggerConfig);
  SwaggerModule.setup(link_swagger, app, document);
  Logger.log(`Check source at ${link_infor} ✅`);
  Logger.log(`Check swagger at http://localhost:${port}/${link_swagger}/ ✅`);
  Logger.log(`[server]: Server is running at http://localhost:${port} ✅`);
  await app.listen(port ?? 3000);
}
bootstrap();
