import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersCreateDto } from './dto/users.create.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersUpdateDto } from './dto/users.update.dto';
import { UsersPaymentsDto } from './dto/users.payments.dto';

/**
 * 사용자 관련 API 컨트롤러입니다.
 */
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * 새로운 사용자를 생성합니다.
   * @param {UsersCreateDto} body - 사용자 생성에 필요한 정보
   * @returns {Promise<any>} 생성된 사용자
   */
  @ApiOperation({ summary: '유저 생성' })
  @Post()
  create(@Body() body: UsersCreateDto): Promise<any> {
    return this.usersService.create(body);
  }

  /**
   * 모든 사용자를 조회합니다.
   * @returns {Promise<any[]>} 사용자 목록
   */
  @ApiOperation({ summary: '전체 유저' })
  @Get()
  findAll(): Promise<any[]> {
    return this.usersService.findAll();
  }

  /**
   * 특정 사용자를 조회합니다.
   * @param {number} id - 사용자 ID
   * @returns {Promise<any>} 조회된 사용자
   */
  @ApiOperation({ summary: '유저 정보' })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<any> {
    return this.usersService.findOne(id);
  }

  /**
   * 특정 사용자의 정보를 업데이트합니다.
   * @param {string} id - 사용자 ID
   * @param {UsersUpdateDto} body - 업데이트할 사용자 정보
   * @returns {Promise<number>} 업데이트된 사용자 ID
   */
  @ApiOperation({ summary: '유저 정보 업데이트' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: UsersUpdateDto,
  ): Promise<number> {
    return this.usersService.update(+id, body);
  }

  /**
   * 특정 사용자를 삭제합니다.
   * @param {string} id - 사용자 ID
   * @returns {Promise<number>} 삭제된 사용자 ID
   */
  @ApiOperation({ summary: '유저 삭제' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<number> {
    return this.usersService.remove(+id);
  }

  /**
   * 특정 사용자의 이용 내역을 조회합니다.
   * @param {number} id - 사용자 ID
   * @returns {Promise<any[]>} 이용 내역 목록
   */
  @ApiOperation({ summary: '유저 이용내역' })
  @Get('histories/:id')
  getHistories(@Param('id') id: number): Promise<any[]> {
    return this.usersService.getHistories(id);
  }

  /**
   * 특정 사용자의 평가 내역을 조회합니다.
   * @param {number} id - 사용자 ID
   * @returns {Promise<any[]>} 평가 내역 목록
   */
  @ApiOperation({ summary: '유저 평가내역' })
  @Get('evals/:id')
  getEvals(@Param('id') id: number): Promise<any[]> {
    return this.usersService.getEvals(id);
  }

  /**
   * 특정 사용자의 결제 리스트를 조회합니다.
   * @param {string} id - 사용자 ID
   * @returns {Promise<any>} 결제 리스트
   */
  @ApiOperation({ summary: '결제 리스트' })
  @Get('payments/:id')
  getPayments(@Param('id') id: string): Promise<any> {
    Logger.log(id);
    return this.usersService.getPayments(+id);
  }

  /**
   * 특정 사용자에게 결제 수단을 추가합니다.
   * @param {UsersPaymentsDto} body - 결제 정보
   * @returns {Promise<any[]>} 업데이트된 결제 정보 목록
   */
  @ApiOperation({ summary: '결제 수단 추가' })
  @Post('payments')
  addPayments(@Body() body: UsersPaymentsDto): Promise<any[]> {
    return this.usersService.addPayments(body);
  }
}
