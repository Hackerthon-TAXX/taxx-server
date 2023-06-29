import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { NoticesCreateDto } from './dto/notices.create.dto';
import { Notices } from './entities/notice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoticesUpdateDto } from './dto/notices.update.dto';

@Injectable()
export class NoticesService {
  constructor(
    @InjectRepository(Notices)
    private noticesRepository: Repository<Notices>
  ) {}

  create(body: NoticesCreateDto) {
    return this.noticesRepository.save(body);
  }

  findAll() {
    return this.noticesRepository.find({
      order: {
        id: "DESC",
      },
    });
  }

  async findOne(id: number) {
    const find = await this.noticesRepository.findOne({ where: { id } });

    if (!find) {
      throw new HttpException("not found", HttpStatus.OK);
    }

    return find;
  }

  // TODO: Work
  async update(id: number, body: NoticesUpdateDto) {
    const find = await this.findOne(id);

    await this.noticesRepository.update(id, body);
    return id;
  }

  async remove(id: number) {
    const find = await this.findOne(id);

    await this.noticesRepository.remove(find);
    return id;
  }
}