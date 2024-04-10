import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // クライアントから送られてきたrequestのbodyを検証（バリデーションを有効化）するためのパイプを追加
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  app.enableCors();
}
bootstrap();
