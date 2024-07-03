import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication): void => {
  const options = new DocumentBuilder()
    .setTitle('FlavGuide API Docs')
    .setDescription('FlavGuide 벡엔드 API 문서입니다.')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    ignoreGlobalPrefix: false,
  });
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
    },
  });
};
