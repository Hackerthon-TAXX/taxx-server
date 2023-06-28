import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import * as expressBasicAuth from "express-basic-auth";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Logger, ValidationPipe } from "@nestjs/common";
import { HttpExceptionFilter } from "./common/exceptions/http-exception.filter";
import helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(helmet());
  app.use(
    ["/docs", "/docs-json"],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASS,
      },
    })
  );

  const config = new DocumentBuilder().setTitle("").setVersion("1.0.0").setDescription("").build();

  const swaggerCustomOptions = {
    swaggerOptions: { docExpansion: "none" },
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
