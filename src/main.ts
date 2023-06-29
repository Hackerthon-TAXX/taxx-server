import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as expressBasicAuth from 'express-basic-auth';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { SuccessInterceptor } from './common/interceptors/success.interceptor';
import { join } from 'path';
import { WsAdapter } from '@nestjs/platform-ws';
// import helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useWebSocketAdapter(new WsAdapter(app));

  app.useGlobalInterceptors(new SuccessInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  // app.use(helmet({ contentSecurityPolicy: false }));
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/static',
  });
  app.use(
    ['/docs', '/docs-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASS,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('TAXX')
    .setVersion('0.0.1')
    .setDescription('SW중심대학 공동해커톤 2023 - TAXX팀')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {});

  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
