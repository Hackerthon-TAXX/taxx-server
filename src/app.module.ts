import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoggerMiddleware } from "./common/middleware/logger/logger.middleware";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./users/entities/users.entity";
import { RidersModule } from "./riders/riders.module";
import { Riders } from "./riders/entities/riders.entity";
import { EvalsModule } from './evals/evals.module';
import { Evals } from "./evals/entities/eval.entity";
import { HistoriesModule } from "./histories/histories.module";
import { Histories } from "./histories/entities/histories.entity";
import { NoticesModule } from './notices/notices.module';
import { Notices } from "./notices/entities/notice.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      timezone: "Z",
      type: "mariadb",
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_BASE,
      entities: [Users, Riders, Histories, Evals, Notices],
      synchronize: true,
    }),
    UsersModule,
    RidersModule,
    EvalsModule,
    HistoriesModule,
    NoticesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
