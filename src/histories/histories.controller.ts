import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { HistoriesService } from "./histories.service";
import { HistoriesCreateDto } from "./dto/histories.create.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Histories")
@Controller("histories")
export class HistoriesController {
  constructor(private readonly historiesService: HistoriesService) {}

  @Post()
  create(@Body() body: HistoriesCreateDto) {
    return this.historiesService.create(body);
  }

  @Get()
  findAll() {
    return this.historiesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.historiesService.findOne(+id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.historiesService.remove(+id);
  }
}
