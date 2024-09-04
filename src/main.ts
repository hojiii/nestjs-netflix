import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      //선언한 Key 이외의 값을 넣지 못하게
      whitelist: true,
      //선언한 key 이외의 값이 들어가면 에러
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
