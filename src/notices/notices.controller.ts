import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NoticesService } from './notices.service';
import { NoticesCreateDto } from './dto/notices.create.dto';
import { NoticesUpdateDto } from './dto/notices.update.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

/**
 * 공지사항 관련 API 컨트롤러입니다.
 */
@ApiTags('Notices')
@Controller('notices')
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  /**
   * 새로운 공지사항을 생성합니다.
   * @param {NoticesCreateDto} body - 공지사항 생성에 필요한 정보
   * @returns {Promise<any>} 생성된 공지사항
   */
  @ApiOperation({ summary: '공지 생성' })
  @Post()
  create(@Body() body: NoticesCreateDto): Promise<any> {
    return this.noticesService.create(body);
  }

  /**
   * 모든 공지사항을 조회합니다.
   * @returns {Promise<any[]>} 공지사항 목록
   */
  @ApiOperation({ summary: '전체 공지' })
  @Get()
  findAll(): Promise<any[]> {
    return this.noticesService.findAll();
  }

  /**
   * 특정 공지사항을 조회합니다.
   * @param {string} id - 공지사항 ID
   * @returns {Promise<any>} 조회된 공지사항
   */
  @ApiOperation({ summary: '공지 정보' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<any> {
    return this.noticesService.findOne(+id);
  }

  /**
   * 특정 공지사항의 정보를 업데이트합니다.
   * @param {string} id - 공지사항 ID
   * @param {NoticesUpdateDto} body - 업데이트할 공지사항 정보
   * @returns {Promise<number>} 업데이트된 공지사항 ID
   */
  @ApiOperation({ summary: '공지 업데이트' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: NoticesUpdateDto,
  ): Promise<number> {
    return this.noticesService.update(+id, body);
  }

  /**
   * 특정 공지사항을 삭제합니다.
   * @param {string} id - 공지사항 ID
   * @returns {Promise<number>} 삭제된 공지사항 ID
   */
  @ApiOperation({ summary: '공지 삭제' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<number> {
    return this.noticesService.remove(+id);
  }
}
