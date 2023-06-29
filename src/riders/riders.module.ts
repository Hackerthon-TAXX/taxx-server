import { Module } from '@nestjs/common';
import { RidersService } from './riders.service';
import { RidersController } from './riders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Riders } from './entities/riders.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Riders])],
  controllers: [RidersController],
  providers: [RidersService],
  exports: [RidersService, TypeOrmModule],
})
export class RidersModule {}
