import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EvlasCreateDto } from './dto/evals.create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Evals } from './entities/eval.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EvalsService {
  constructor(
    @InjectRepository(Evals)
    private evalsRepository: Repository<Evals>
  ) {}

  create(body: EvlasCreateDto) {
    return this.evalsRepository.save(body);
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
