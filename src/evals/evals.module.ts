import { Module } from '@nestjs/common';
import { EvalsService } from './evals.service';
import { EvalsController } from './evals.controller';
import { Evals } from './entities/eval.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Evals])],
  controllers: [EvalsController],
  providers: [EvalsService]
})
export class EvalsModule {}
