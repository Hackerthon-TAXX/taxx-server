import { Injectable } from '@nestjs/common';
import { RidersCreateDto } from './dto/riders.create.dto';
import { RidersUpdateDto } from './dto/riders.update.dto';
import { Riders } from './entities/riders.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RidersService {
  constructor(
    @InjectRepository(Riders)
    private ridersRepository: Repository<Riders>
  ) {}

  create(body: RidersCreateDto) {
    return this.ridersRepository.save(body);
  }

  findAll() {
    return this.ridersRepository.find({
      order: {
        id: 'DESC'
      }
    });
  }

  findOne(id: number) {
    return this.ridersRepository.findOne({where:{id}});
  }

  async update(id: number, body: RidersUpdateDto) {
    const find = await this.findOne(id);

    if (find) {
      await this.ridersRepository.update(id, body);
      return id;
    } else {
      return "not found";
    }
  }

  async remove(id: number) {
    const find = await this.findOne(id);

    if (find) {
      await this.ridersRepository.remove(find);
      return id;
    } else {
      return "not found";
    }
  }
}
