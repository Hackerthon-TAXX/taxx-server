import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EvalsService } from './evals.service';
import { EvlasCreateDto } from './dto/evals.create.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Evals")
@Controller('evals')
export class EvalsController {
  constructor(private readonly evalsService: EvalsService) {}

  @ApiOperation({ summary: "평가 생성" })
  @Post()
  create(@Body() body: EvlasCreateDto) {
    return this.evalsService.create(body);
  }

  @ApiOperation({ summary: "전체 평가" })
  @Get()
  findAll() {
    return this.evalsService.findAll();
  }

  @ApiOperation({ summary: "평가 정보" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evalsService.findOne(+id);
  }

  @ApiOperation({ summary: "평가 삭제" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evalsService.remove(+id);
  }
}
