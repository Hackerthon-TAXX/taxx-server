import { Module } from '@nestjs/common';
import { NoticesService } from './notices.service';
import { NoticesController } from './notices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notices } from './entities/notice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notices])],
  controllers: [NoticesController],
  providers: [NoticesService]
})
export class NoticesModule {}
