import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from 'src/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: configService.get('CORS_ORIGIN').split(','),
    credentials: true,
  });

  setupSwagger(app);

  await app.listen(configService.get('PORT'));
}
bootstrap();
