import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EvlasCreateDto } from './dto/evals.create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Evals } from './entities/eval.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { RidersService } from 'src/riders/riders.service';

/**
 * 평가 관련 서비스입니다.
 */
@Injectable()
export class EvalsService {
  constructor(
    @InjectRepository(Evals)
    private evalsRepository: Repository<Evals>,
    private readonly usersService: UsersService,
    private readonly ridersService: RidersService,
  ) {}

  /**
   * 새로운 평가를 생성합니다.
   * @param {EvlasCreateDto} body - 평가 생성에 필요한 정보
   * @returns {Promise<any>} 생성된 평가
   */
  async create(body: EvlasCreateDto): Promise<any> {
    const findUsers = await this.usersService.findOne(body.usersId);
    const findRiders = await this.ridersService.findOne(body.ridersId);

    await this.ridersService.updateEvals(findRiders.id, {
      sum: body.rate + findRiders.sum,
      count: findRiders.count + 1,
    });

    await this.evalsRepository.save({
      ...body,
      users: findUsers,
      riders: findRiders,
    });

    return body;
  }

  /**
   * 모든 평가를 조회합니다.
   * @returns {Promise<any[]>} 평가 목록
   */
  findAll(): Promise<any[]> {
    return this.evalsRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  /**
   * 특정 평가를 조회합니다.
   * @param {number} id - 평가 ID
   * @returns {Promise<any>} 조회된 평가
   * @throws {HttpException} 평가가 존재하지 않을 경우 예외 발생
   */
  async findOne(id: number): Promise<any> {
    const find = await this.evalsRepository.findOne({ where: { id } });

    if (!find) {
      throw new HttpException('not found', HttpStatus.OK);
    }

    return find;
  }

  /**
   * 특정 평가를 삭제합니다.
   * @param {number} id - 평가 ID
   * @returns {Promise<number>} 삭제된 평가 ID
   */
  async remove(id: number): Promise<number> {
    const find = await this.findOne(id);

    await this.evalsRepository.remove(find);
    return id;
  }
}
