import { NestFactory } from '@nestjs/core';
import { env } from 'process';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';

// const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(
  //   cookieSession({
  //     keys: ['qwerty'], // key used to ecyrpt the cookie
  //   }),
  // );

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true, // the purpose of this property is to make sure that the incoming requests don't have extraneous properties, that we aren't expecting. If true, it discards extra extraneous properties
  //   }),
  // );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
