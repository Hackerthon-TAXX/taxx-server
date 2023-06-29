import { Module, forwardRef } from "@nestjs/common";
import { HistoriesService } from "./histories.service";
import { HistoriesController } from "./histories.controller";
import { UsersModule } from "src/users/users.module";
import { RidersModule } from "src/riders/riders.module";
import { Histories } from "./entities/histories.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "src/users/users.service";
import { RidersService } from "src/riders/riders.service";

@Module({
  imports: [TypeOrmModule.forFeature([Histories]), forwardRef(() => UsersModule), forwardRef(() => RidersModule)],
  controllers: [HistoriesController],
  providers: [HistoriesService, UsersService, RidersService],
})
export class HistoriesModule {}
