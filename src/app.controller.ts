import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

/**
 * 시스템에 관련된 API 컨트롤러입니다.
 */
@ApiTags('System')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * 인사 메시지를 반환하는 API 엔드포인트입니다.
   * @returns {string} 인사 메시지
   */
  @ApiOperation({ summary: 'Hello World!' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /**
   * 기사님이 이동하는 정보를 반환하는 API 엔드포인트입니다.
   * @param {number} riderId - 기사 ID
   * @param {number} latitude - 현재 위도
   * @param {number} longitude - 현재 경도
   * @returns {any} 기사 이동 정보
   */
  @ApiOperation({ summary: '기사님 이동' })
  @Get('v1/path/:riderId/:latitude/:longitude')
  getRiderMove(
    @Param('riderId') riderId: number,
    @Param('latitude') latitude: number,
    @Param('longitude') longitude: number,
  ): any {
    return this.appService.getRiderMove(riderId, latitude, longitude);
  }
}
