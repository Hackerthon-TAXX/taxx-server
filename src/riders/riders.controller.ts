import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { RidersService } from './riders.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RidersCreateDto } from './dto/riders.create.dto';
import { RidersUpdateDto } from './dto/riders.update.dto';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@ApiTags('Riders')
@Controller('riders')
@UseInterceptors(SuccessInterceptor)
export class RidersController {
  constructor(private readonly ridersService: RidersService) {}

  @ApiOperation({ summary: "기사 생성" })
  @Post()
  create(@Body() body: RidersCreateDto) {
    return this.ridersService.create(body);
  }

  @ApiOperation({ summary: "전체 기사" })
  @Get()
  findAll() {
    return this.ridersService.findAll();
  }

  @ApiOperation({ summary: "기사 정보" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ridersService.findOne(+id);
  }

  @ApiOperation({ summary: "기사 정보 업데이트" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRiderDto: RidersUpdateDto) {
    return this.ridersService.update(+id, updateRiderDto);
  }

  @ApiOperation({ summary: "기사 삭제" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ridersService.remove(+id);
  }
}
