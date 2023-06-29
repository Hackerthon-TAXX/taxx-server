import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { EvlasCreateDto } from "./dto/evals.create.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Evals } from "./entities/eval.entity";
import { Repository } from "typeorm";
import { UsersService } from "src/users/users.service";
import { RidersService } from "src/riders/riders.service";

@Injectable()
export class EvalsService {
  constructor(
    @InjectRepository(Evals)
    private evalsRepository: Repository<Evals>,
    private readonly usersService: UsersService,
    private readonly ridersService: RidersService
  ) {}

  async create(body: EvlasCreateDto) {
    const findUsers = await this.usersService.findOne(body.usersId);
    const findRiders = await this.ridersService.findOne(body.ridersId);

    return this.evalsRepository.save({
      ...body,
      users: findUsers,
      riders: findRiders,
    });
  }

  findAll() {
    return this.evalsRepository.find({
      order: {
        id: "DESC",
      },
    });
  }

  async findOne(id: number) {
    const find = await this.evalsRepository.findOne({ where: { id } });

    if (!find) {
      throw new HttpException("not found", HttpStatus.OK);
    }

    return find;
  }

  async remove(id: number) {
    const find = await this.findOne(id);

    await this.evalsRepository.remove(find);
    return id;
  }
}
