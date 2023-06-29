import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NoticesService } from './notices.service';
import { NoticesCreateDto } from './dto/notices.create.dto';
import { NoticesUpdateDto } from './dto/notices.update.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Notices')
@Controller('notices')
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @ApiOperation({ summary: "공지 생성" })
  @Post()
  create(@Body() body: NoticesCreateDto) {
    return this.noticesService.create(body);
  }

  @ApiOperation({ summary: "전체 공지" })
  @Get()
  findAll() {
    return this.noticesService.findAll();
  }

  @ApiOperation({ summary: "공지 정보" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noticesService.findOne(+id);
  }

  @ApiOperation({ summary: "공지 정보 업데이트" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: NoticesUpdateDto) {
    return this.noticesService.update(+id, body);
  }

  @ApiOperation({ summary: "공지 정보 삭제" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noticesService.remove(+id);
  }
}
