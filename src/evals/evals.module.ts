import { Module, forwardRef } from '@nestjs/common';
import { EvalsService } from './evals.service';
import { EvalsController } from './evals.controller';
import { Evals } from './entities/eval.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { RidersModule } from 'src/riders/riders.module';
import { UsersService } from 'src/users/users.service';
import { RidersService } from 'src/riders/riders.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Evals]),
    forwardRef(() => UsersModule),
    forwardRef(() => RidersModule),
  ],
  controllers: [EvalsController],
  providers: [EvalsService, UsersService, RidersService],
})
export class EvalsModule {}
