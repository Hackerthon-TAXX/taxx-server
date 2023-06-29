import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RidersService } from './riders.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RidersCreateDto } from './dto/riders.create.dto';
import { RidersUpdateDto } from './dto/riders.update.dto';

/**
 * 기사님 관련 API 컨트롤러입니다.
 */
@ApiTags('Riders')
@Controller('riders')
export class RidersController {
  constructor(private readonly ridersService: RidersService) {}

  /**
   * 새로운 기사님을 생성합니다.
   * @param {RidersCreateDto} body - 기사님 생성에 필요한 정보
   * @returns {Promise<any>} 생성된 기사님
   */
  @ApiOperation({ summary: '기사 생성' })
  @Post()
  create(@Body() body: RidersCreateDto): Promise<any> {
    return this.ridersService.create(body);
  }

  /**
   * 모든 기사님을 조회합니다.
   * @returns {Promise<any[]>} 기사님 목록
   */
  @ApiOperation({ summary: '전체 기사' })
  @Get()
  findAll(): Promise<any[]> {
    return this.ridersService.findAll();
  }

  /**
   * 특정 기사님을 조회합니다.
   * @param {string} id - 기사님 ID
   * @returns {Promise<any>} 조회된 기사님
   */
  @ApiOperation({ summary: '기사 정보' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<any> {
    return this.ridersService.findOne(+id);
  }

  /**
   * 특정 기사님의 정보를 업데이트합니다.
   * @param {string} id - 기사님 ID
   * @param {RidersUpdateDto} updateRiderDto - 업데이트할 기사님 정보
   * @returns {Promise<number>} 업데이트된 기사님 ID
   */
  @ApiOperation({ summary: '기사 정보 업데이트' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRiderDto: RidersUpdateDto,
  ): Promise<number> {
    return this.ridersService.update(+id, updateRiderDto);
  }

  /**
   * 특정 기사님을 삭제합니다.
   * @param {string} id - 기사님 ID
   * @returns {Promise<number>} 삭제된 기사님 ID
   */
  @ApiOperation({ summary: '기사 삭제' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<number> {
    return this.ridersService.remove(+id);
  }

  /**
   * 가까운 기사님을 찾습니다.
   * @param {number} latitude - 현재 위도
   * @param {number} longitude - 현재 경도
   * @returns {Promise<any>} 가까운 기사님 정보
   */
  @ApiOperation({ summary: '가까운 기사님 찾기' })
  @Get('/location/:latitude/:longitude')
  getRidersLocation(
    @Param('latitude') latitude: number,
    @Param('longitude') longitude: number,
  ): Promise<any> {
    return this.ridersService.getRidersLocation(latitude, longitude);
  }
}
