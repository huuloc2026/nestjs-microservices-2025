import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const SwaggerConfig = new DocumentBuilder()
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
