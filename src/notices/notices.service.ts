import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { NoticesCreateDto } from './dto/notices.create.dto';
import { Notices } from './entities/notice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoticesUpdateDto } from './dto/notices.update.dto';

/**
 * 공지사항 관련 서비스입니다.
 */
@Injectable()
export class NoticesService {
  constructor(
    @InjectRepository(Notices)
    private noticesRepository: Repository<Notices>,
  ) {}

  /**
   * 새로운 공지사항을 생성합니다.
   * @param {NoticesCreateDto} body - 공지사항 생성에 필요한 정보
   * @returns {Promise<any>} 생성된 공지사항
   */
  create(body: NoticesCreateDto): Promise<any> {
    return this.noticesRepository.save(body);
  }

  /**
   * 모든 공지사항을 조회합니다.
   * @returns {Promise<any[]>} 공지사항 목록
   */
  findAll(): Promise<any[]> {
    return this.noticesRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  /**
   * 특정 공지사항을 조회합니다.
   * @param {number} id - 공지사항 ID
   * @returns {Promise<any>} 조회된 공지사항
   * @throws {HttpException} 공지사항이 존재하지 않을 경우 예외 발생
   */
  async findOne(id: number): Promise<any> {
    const find = await this.noticesRepository.findOne({ where: { id } });

    if (!find) {
      throw new HttpException('not found', HttpStatus.OK);
    }

    return find;
  }

  /**
   * 특정 공지사항의 정보를 업데이트합니다.
   * @param {number} id - 공지사항 ID
   * @param {NoticesUpdateDto} body - 업데이트할 공지사항 정보
   * @returns {Promise<number>} 업데이트된 공지사항 ID
   */
  async update(id: number, body: NoticesUpdateDto): Promise<number> {
    await this.findOne(id);

    await this.noticesRepository.update(id, body);
    return id;
  }

  /**
   * 특정 공지사항을 삭제합니다.
   * @param {number} id - 공지사항 ID
   * @returns {Promise<number>} 삭제된 공지사항 ID
   */
  async remove(id: number): Promise<number> {
    const find = await this.findOne(id);

    await this.noticesRepository.remove(find);
    return id;
  }
}
