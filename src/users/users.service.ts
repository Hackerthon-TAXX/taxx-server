import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersCreateDto } from './dto/users.create.dto';
import { UsersUpdateDto } from './dto/users.update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import { UsersPaymentsDto } from './dto/users.payments.dto';

/**
 * 사용자 관련 서비스입니다.
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  /**
   * 새로운 사용자를 생성합니다.
   * @param {UsersCreateDto} body - 사용자 생성에 필요한 정보
   * @returns {Promise<Users>} 생성된 사용자
   */
  create(body: UsersCreateDto): Promise<Users> {
    return this.usersRepository.save(body);
  }

  /**
   * 모든 사용자를 조회합니다.
   * @returns {Promise<Users[]>} 사용자 목록
   */
  findAll(): Promise<Users[]> {
    return this.usersRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  /**
   * 특정 사용자를 조회합니다.
   * @param {number} id - 사용자 ID
   * @returns {Promise<Users>} 조회된 사용자
   * @throws {HttpException} 사용자가 존재하지 않을 경우 예외 발생
   */
  async findOne(id: number): Promise<Users> {
    const find = await this.usersRepository.findOne({ where: { id } });

    if (!find) {
      throw new HttpException('not found', HttpStatus.OK);
    }

    return find;
  }

  /**
   * 특정 사용자의 정보를 업데이트합니다.
   * @param {number} id - 사용자 ID
   * @param {UsersUpdateDto} body - 업데이트할 사용자 정보
   * @returns {Promise<number>} 업데이트된 사용자 ID
   */
  async update(id: number, body: UsersUpdateDto): Promise<number> {
    const find = await this.findOne(id);

    await this.usersRepository.update(id, body);
    return id;
  }

  /**
   * 특정 사용자를 삭제합니다.
   * @param {number} id - 사용자 ID
   * @returns {Promise<number>} 삭제된 사용자 ID
   */
  async remove(id: number): Promise<number> {
    const find = await this.findOne(id);

    await this.usersRepository.remove(find);
    return id;
  }

  /**
   * 특정 사용자의 결제 정보를 조회합니다.
   * @param {number} id - 사용자 ID
   * @returns {Promise<any>} 결제 정보
   */
  async getPayments(id: number): Promise<any> {
    const find = await this.findOne(id);

    return find.payments;
  }

  /**
   * 특정 사용자에게 결제 정보를 추가합니다.
   * @param {UsersPaymentsDto} body - 결제 정보
   * @returns {Promise<any[]>} 업데이트된 결제 정보 목록
   */
  async addPayments(body: UsersPaymentsDto): Promise<any[]> {
    const find = await this.findOne(+body.id);
    const newPayments = [];

    newPayments.push(...find.payments, body.payments);

    await this.usersRepository.update(find.id, {
      payments: [...newPayments],
    });

    return [...newPayments];
  }

  /**
   * 특정 사용자의 이력 정보를 조회합니다.
   * @param {number} id - 사용자 ID
   * @returns {Promise<any[]>} 이력 정보 목록
   * @throws {HttpException} 사용자가 존재하지 않을 경우 예외 발생
   */
  async getHistories(id: number): Promise<any[]> {
    const find = await this.usersRepository.findOne({
      where: { id },
      relations: { histories: true },
      order: {
        histories: {
          id: 'DESC',
        },
      },
    });

    if (!find) {
      throw new HttpException('not found', HttpStatus.OK);
    }

    return find.histories;
  }

  /**
   * 특정 사용자의 평가 정보를 조회합니다.
   * @param {number} id - 사용자 ID
   * @returns {Promise<any[]>} 평가 정보 목록
   * @throws {HttpException} 사용자가 존재하지 않을 경우 예외 발생
   */
  async getEvals(id: number): Promise<any[]> {
    const find = await this.usersRepository.findOne({
      where: { id },
      relations: { evals: true },
      order: {
        evals: {
          id: 'DESC',
        },
      },
    });

    if (!find) {
      throw new HttpException('not found', HttpStatus.OK);
    }

    return find.evals;
  }
}
