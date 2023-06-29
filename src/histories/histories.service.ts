import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HistoriesCreateDto } from './dto/histories.create.dto';
import { Histories } from './entities/histories.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { RidersService } from 'src/riders/riders.service';

/**
 * 이용 내역 관련 서비스입니다.
 */
@Injectable()
export class HistoriesService {
  constructor(
    @InjectRepository(Histories)
    private historiesRepository: Repository<Histories>,
    private readonly usersService: UsersService,
    private readonly ridersService: RidersService,
  ) {}

  /**
   * 새로운 이용 내역을 생성합니다.
   * @param {HistoriesCreateDto} body - 이용 내역 생성에 필요한 정보
   * @returns {Promise<any>} 생성된 이용 내역
   */
  async create(body: HistoriesCreateDto): Promise<any> {
    const findUsers = await this.usersService.findOne(body.usersId);
    const findRiders = await this.ridersService.findOne(body.ridersId);

    await this.historiesRepository.save({
      ...body,
      users: findUsers,
      riders: findRiders,
    });

    return body;
  }

  /**
   * 모든 이용 내역을 조회합니다.
   * @returns {Promise<any[]>} 이용 내역 목록
   */
  findAll(): Promise<any[]> {
    return this.historiesRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  /**
   * 특정 이용 내역을 조회합니다.
   * @param {number} id - 이용 내역 ID
   * @returns {Promise<any>} 조회된 이용 내역
   * @throws {HttpException} 이용 내역이 존재하지 않을 경우 예외 발생
   */
  async findOne(id: number): Promise<any> {
    const find = await this.historiesRepository.findOne({ where: { id } });

    if (!find) {
      throw new HttpException('not found', HttpStatus.OK);
    }

    return find;
  }

  /**
   * 특정 이용 내역을 삭제합니다.
   * @param {number} id - 이용 내역 ID
   * @returns {Promise<number>} 삭제된 이용 내역 ID
   */
  async remove(id: number): Promise<number> {
    const find = await this.findOne(id);

    await this.historiesRepository.remove(find);
    return id;
  }
}
