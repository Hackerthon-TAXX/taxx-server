import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { EvalsService } from './evals.service';
import { EvlasCreateDto } from './dto/evals.create.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

/**
 * 평가 관련 API 컨트롤러입니다.
 */
@ApiTags('Evals')
@Controller('evals')
export class EvalsController {
  constructor(private readonly evalsService: EvalsService) {}

  /**
   * 새로운 평가를 생성합니다.
   * @param {EvlasCreateDto} body - 평가 생성에 필요한 정보
   * @returns {Promise<any>} 생성된 평가
   */
  @ApiOperation({ summary: '평가 생성' })
  @Post()
  create(@Body() body: EvlasCreateDto): Promise<any> {
    return this.evalsService.create(body);
  }

  /**
   * 모든 평가를 조회합니다.
   * @returns {Promise<any[]>} 평가 목록
   */
  @ApiOperation({ summary: '전체 평가' })
  @Get()
  findAll(): Promise<any[]> {
    return this.evalsService.findAll();
  }

  /**
   * 특정 평가를 조회합니다.
   * @param {string} id - 평가 ID
   * @returns {Promise<any>} 조회된 평가
   */
  @ApiOperation({ summary: '평가 정보' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<any> {
    return this.evalsService.findOne(+id);
  }

  /**
   * 특정 평가를 삭제합니다.
   * @param {string} id - 평가 ID
   * @returns {Promise<number>} 삭제된 평가 ID
   */
  @ApiOperation({ summary: '평가 삭제' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<number> {
    return this.evalsService.remove(+id);
  }
}
