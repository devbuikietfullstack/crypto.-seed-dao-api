import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.PORT || 8081;
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  await app.listen(PORT, () => {
    console.log('Api listenning at http://127.0.0.1:' + PORT);
  });
}
bootstrap();
