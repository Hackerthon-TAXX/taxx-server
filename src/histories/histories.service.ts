import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { HistoriesCreateDto } from "./dto/histories.create.dto";
import { Histories } from "./entities/histories.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersService } from "src/users/users.service";
import { RidersService } from "src/riders/riders.service";

@Injectable()
export class HistoriesService {
  constructor(
    @InjectRepository(Histories)
    private historiesRepository: Repository<Histories>,
    private readonly usersService: UsersService,
    private readonly ridersService: RidersService
  ) {}

  async create(body: HistoriesCreateDto) {
    const findUsers = await this.usersService.findOne(body.usersId);
    const findRiders = await this.ridersService.findOne(body.ridersId);

    await this.historiesRepository.save({
      ...body,
      users: findUsers,
      riders: findRiders,
    });

    return body;
  }

  findAll() {
    return this.historiesRepository.find({
      order: {
        id: "DESC",
      },
    });
  }

  async findOne(id: number) {
    const find = await this.historiesRepository.findOne({ where: { id } });

    if (!find) {
      throw new HttpException("not found", HttpStatus.OK);
    }

    return find;
  }

  async remove(id: number) {
    const find = await this.findOne(id);

    await this.historiesRepository.remove(find);
    return id;
  }
}
