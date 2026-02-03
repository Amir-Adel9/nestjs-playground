import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove any properties that aren't in the DTO
      forbidNonWhitelisted: true, // Error if someone sends extra properties
      transform: true, // Convert types automatically
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
