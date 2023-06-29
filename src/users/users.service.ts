import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { UsersCreateDto } from "./dto/users.create.dto";
import { UsersUpdateDto } from "./dto/users.update.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./entities/users.entity";
import { Repository } from "typeorm";
import { UsersPaymentsDto } from "./dto/users.payments.dto";
import { Evals } from "../evals/entities/eval.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>
  ) {}

  create(body: UsersCreateDto) {
    return this.usersRepository.save(body);
  }

  findAll() {
    return this.usersRepository.find({
      order: {
        id: "DESC",
      },
    });
  }

  async findOne(id: number) {
    const find = await this.usersRepository.findOne({ where: { id } });

    if (!find) {
      throw new HttpException("not found", HttpStatus.OK);
    }

    return find;
  }

  async update(id: number, body: UsersUpdateDto) {
    const find = await this.findOne(id);

    await this.usersRepository.update(id, body);
    return id;
  }

  async remove(id: number) {
    const find = await this.findOne(id);

    await this.usersRepository.remove(find);
    return id;
  }

  async getPayments(id: number) {
    const find = await this.findOne(id);

    return find.payments;
  }

  async addPayments(body: UsersPaymentsDto) {
    const find = await this.findOne(+body.id);
    const newPayments = [];

    newPayments.push(...find.payments, body.payments);

    await this.usersRepository.update(find.id, {
      payments: [...newPayments],
    });

    return [...newPayments];
  }

  async getHistories(id: number) {
    const find = await this.usersRepository.findOne({
      where: { id },
      relations: { histories: true },
      order: {
        histories: {
          id: "DESC",
        },
      },
    });

    if (!find) {
      throw new HttpException("not found", HttpStatus.OK);
    }

    return find.histories;
  }

  async getEvals(id: number) {
    const find = await this.usersRepository.findOne({
      where: { id },
      relations: { evals: true },
      order: {
        evals: {
          id: "DESC",
        },
      },
    });

    if (!find) {
      throw new HttpException("not found", HttpStatus.OK);
    }

    return find.evals;
  }
}
