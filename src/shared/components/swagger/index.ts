import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const SwaggerConfig = new DocumentBuilder()
  .setTitle('Ecommerce Project - Huu Loc ') // Set the title of the API
  .setDescription('Ecommerce API description') // Set the description of the API
  .setVersion('0.1') // Set the version of the API
  .setBasePath('/v1/api')
  .setContact('Huuloc206', 'github.com/huuloc206', 'huuloc2026@gmail.com')
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
