import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RidersCreateDto } from './dto/riders.create.dto';
import { RidersUpdateDto } from './dto/riders.update.dto';
import { Riders } from './entities/riders.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RidersMoveDto } from './dto/riders.move.dto';
import { RidersEvalsDto } from './dto/riders.evals.dto';
import {
  getDistance,
  predictTime,
  strDistance,
} from 'src/common/utils/useful.utils';

/**
 * 기사님 관련 서비스입니다.
 */
@Injectable()
export class RidersService {
  constructor(
    @InjectRepository(Riders)
    private ridersRepository: Repository<Riders>,
  ) {}

  /**
   * 새로운 기사님을 생성합니다.
   * @param {RidersCreateDto} body - 기사님 생성에 필요한 정보
   * @returns {Promise<any>} 생성된 기사님
   */
  create(body: RidersCreateDto): Promise<any> {
    return this.ridersRepository.save(body);
  }

  /**
   * 모든 기사님을 조회합니다.
   * @returns {Promise<any[]>} 기사님 목록
   */
  findAll(): Promise<any[]> {
    return this.ridersRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  /**
   * 특정 기사님을 조회합니다.
   * @param {number} id - 기사님 ID
   * @returns {Promise<any>} 조회된 기사님
   * @throws {HttpException} 기사님이 존재하지 않을 경우 예외 발생
   */
  async findOne(id: number): Promise<any> {
    const find = await this.ridersRepository.findOne({ where: { id } });

    if (!find) {
      throw new HttpException('not found', HttpStatus.OK);
    }

    return find;
  }

  /**
   * 특정 기사님의 정보를 업데이트합니다.
   * @param {number} id - 기사님 ID
   * @param {RidersUpdateDto} body - 업데이트할 기사님 정보
   * @returns {Promise<number>} 업데이트된 기사님 ID
   */
  async update(id: number, body: RidersUpdateDto): Promise<number> {
    await this.findOne(id);

    await this.ridersRepository.update(id, body);
    return id;
  }

  /**
   * 특정 기사님을 삭제합니다.
   * @param {number} id - 기사님 ID
   * @returns {Promise<number>} 삭제된 기사님 ID
   */
  async remove(id: number): Promise<number> {
    const find = await this.findOne(id);

    await this.ridersRepository.remove(find);
    return id;
  }

  /**
   * 기사님들의 위치 정보를 조회합니다.
   * @param {number} latitude - 현재 위도
   * @param {number} longitude - 현재 경도
   * @returns {Promise<any>} 기사님 위치 정보
   */
  async getRidersLocation(latitude: number, longitude: number): Promise<any> {
    const findRiders = await this.findAll();
    const locationList = [];

    if (findRiders === null) {
      return null;
    }

    findRiders.map((rider) => {
      const finalRate = rider.sum / rider.count;
      const firstDecimal = Math.floor((finalRate * 10) % 10) <= 5 ? 0.5 : 0.0;
      const finalDistance =
        (
          getDistance(rider.latitude, rider.longitude, latitude, longitude) /
          100
        ).toFixed(2) + 'km';

      locationList.push({
        id: rider.id,
        name: rider.name,
        image: rider.image,
        distance: finalDistance,
        time: predictTime(
          getDistance(rider.latitude, rider.longitude, latitude, longitude),
        ),
        rate: Math.floor(finalRate) + firstDecimal,
        count: rider.count,
      });
    });

    return locationList.sort((a, b) => a.distance - b.distance);
  }

  /**
   * 특정 기사님의 위치를 업데이트합니다.
   * @param {number} id - 기사님 ID
   * @param {RidersMoveDto} body - 업데이트할 위치 정보
   * @returns {Promise<number>} 업데이트된 기사님 ID
   */
  async move(id: number, body: RidersMoveDto): Promise<number> {
    await this.ridersRepository.update(id, body);
    return id;
  }

  /**
   * 특정 기사님의 평가 정보를 업데이트합니다.
   * @param {number} id - 기사님 ID
   * @param {RidersEvalsDto} body - 업데이트할 평가 정보
   * @returns {Promise<number>} 업데이트된 기사님 ID
   */
  async updateEvals(id: number, body: RidersEvalsDto): Promise<number> {
    await this.findOne(id);

    await this.ridersRepository.update(id, body);
    return id;
  }
}
