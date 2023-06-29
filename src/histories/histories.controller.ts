import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { HistoriesService } from "./histories.service";
import { HistoriesCreateDto } from "./dto/histories.create.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Histories")
@Controller("histories")
export class HistoriesController {
  constructor(private readonly historiesService: HistoriesService) {}

  @ApiOperation({ summary: "이용내역 생성" })
  @Post()
  create(@Body() body: HistoriesCreateDto) {
    return this.historiesService.create(body);
  }

  @ApiOperation({ summary: "이용내역 전체 리스트" })
  @Get()
  findAll() {
    return this.historiesService.findAll();
  }

  @ApiOperation({ summary: "이용내역 정보" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.historiesService.findOne(+id);
  }

  @ApiOperation({ summary: "이용내역 삭제" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.historiesService.remove(+id);
  }
}
