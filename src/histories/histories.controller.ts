import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { HistoriesService } from './histories.service';
import { HistoriesCreateDto } from './dto/histories.create.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

/**
 * 이용내역 관련 API 컨트롤러입니다.
 */
@ApiTags('Histories')
@Controller('histories')
export class HistoriesController {
  constructor(private readonly historiesService: HistoriesService) {}

  /**
   * 새로운 이용 내역을 생성합니다.
   * @param {HistoriesCreateDto} body - 이용 내역 생성에 필요한 정보
   * @returns {Promise<any>} 생성된 이용 내역
   */
  @ApiOperation({ summary: '이용내역 생성' })
  @Post()
  create(@Body() body: HistoriesCreateDto): Promise<any> {
    return this.historiesService.create(body);
  }

  /**
   * 모든 이용 내역을 조회합니다.
   * @returns {Promise<any[]>} 이용 내역 목록
   */
  @ApiOperation({ summary: '이용내역 전체 리스트' })
  @Get()
  findAll(): Promise<any[]> {
    return this.historiesService.findAll();
  }

  /**
   * 특정 이용 내역을 조회합니다.
   * @param {string} id - 이용 내역 ID
   * @returns {Promise<any>} 조회된 이용 내역
   */
  @ApiOperation({ summary: '이용내역 정보' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<any> {
    return this.historiesService.findOne(+id);
  }

  /**
   * 특정 이용 내역을 삭제합니다.
   * @param {string} id - 이용 내역 ID
   * @returns {Promise<number>} 삭제된 이용 내역 ID
   */
  @ApiOperation({ summary: '이용내역 삭제' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<number> {
    return this.historiesService.remove(+id);
  }
}
