import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { UsersCreateDto } from "./dto/users.create.dto";
import { UsersUpdateDto } from "./dto/users.update.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./entities/users.entity";
import { Repository } from "typeorm";
import { UsersPaymentsDto } from "./dto/users.payments.dto";

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

  findOne(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }

  async update(id: number, body: UsersUpdateDto) {
    const find = await this.findOne(id);

    if (find) {
      await this.usersRepository.update(id, body);
      return id;
    } else {
      return "not found";
    }
  }

  async remove(id: number) {
    const find = await this.findOne(id);

    if (find) {
      await this.usersRepository.remove(find);
      return id;
    } else {
      return "not found";
    }
  }

  async getPayments(id: number) {
    const find = await this.findOne(id);

    if (find) {
      return find.payments;
    }

    throw new HttpException("not found", HttpStatus.OK);
  }

  async addPayments(body: UsersPaymentsDto) {
    const find = await this.findOne(+body.id);
    const newPayments = [];

    if (find) {
      newPayments.push(...find.payments, body.payments);
      console.log(JSON.stringify(newPayments));

      this.usersRepository.update(find.id, {
        payments: [...newPayments],
      });
    }

    throw new HttpException("not found", HttpStatus.OK);
  }
}
