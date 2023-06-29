import { Controller, Get, Param, Patch } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("System")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: "Hello World!" })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({ summary: "기사님 이동" })
  @Get("v1/path/:riderId/:latitude/:longitude")
  getRiderMove(@Param("riderId") riderId: number, @Param("latitude") latitude: number, @Param("longitude") longitude: number) {
    return this.appService.getRiderMove(riderId, latitude, longitude);
  }
}
