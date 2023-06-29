import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersCreateDto } from "./dto/users.create.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UsersUpdateDto } from "./dto/users.update.dto";
import { UsersPaymentsDto } from "./dto/users.payments.dto";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "유저 생성" })
  @Post()
  create(@Body() body: UsersCreateDto) {
    return this.usersService.create(body);
  }

  @ApiOperation({ summary: "전체 유저" })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: "유저 정보" })
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: "유저 이용내역" })
  @Get("histories/:id")
  getHistories(@Param("id") id: number) {
    return this.usersService.getHistories(id);
  }

  @ApiOperation({ summary: "유저 정보 업데이트" })
  @Patch(":id")
  update(@Param("id") id: string, @Body() body: UsersUpdateDto) {
    return this.usersService.update(+id, body);
  }

  @ApiOperation({ summary: "유저 삭제" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }

  @ApiOperation({ summary: "결제 리스트" })
  @Get("payments/:id")
  getPayments(@Param("id") id: string) {
    Logger.log(id);
    return this.usersService.getPayments(+id);
  }

  @ApiOperation({ summary: "결제 수단 추가" })
  @Post("payments")
  addPayments(@Body() body: UsersPaymentsDto) {
    return this.usersService.addPayments(body);
  }
}
