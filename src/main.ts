import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import * as expressBasicAuth from "express-basic-auth";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { HttpExceptionFilter } from "./common/exceptions/http-exception.filter";
import helmet from "helmet";
import { SuccessInterceptor } from "./common/interceptors/success.interceptor";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, "..", "public"));
  app.useGlobalInterceptors(new SuccessInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(
    ["/docs", "/docs-json"],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASS,
      },
    })
  );

  const config = new DocumentBuilder().setTitle("taxx").setVersion("0.0.1").setDescription("SW Hack").build();

  const swaggerCustomOptions = {
    swaggerOptions: {},
  };

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document, swaggerCustomOptions);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
