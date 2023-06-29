import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NoticesService } from './notices.service';
import { NoticesCreateDto } from './dto/notices.create.dto';
import { NoticesUpdateDto } from './dto/notices.update.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Notices')
@Controller('notices')
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @Post()
  create(@Body() body: NoticesCreateDto) {
    return this.noticesService.create(body);
  }

  @Get()
  findAll() {
    return this.noticesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noticesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: NoticesUpdateDto) {
    return this.noticesService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noticesService.remove(+id);
  }
}
