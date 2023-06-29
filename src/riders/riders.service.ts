import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { RidersCreateDto } from "./dto/riders.create.dto";
import { RidersUpdateDto } from "./dto/riders.update.dto";
import { Riders } from "./entities/riders.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { getDistance } from "src/common/utils/useful.utils";

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
        id: "DESC",
      },
    });
  }

  async findOne(id: number) {
    const find = await this.ridersRepository.findOne({ where: { id } });

    if (!find) {
      throw new HttpException("not found", HttpStatus.OK);
    }

    return find;
  }

  async update(id: number, body: RidersUpdateDto) {
    const find = await this.findOne(id);

    await this.ridersRepository.update(id, body);
    return id;
  }

  async remove(id: number) {
    const find = await this.findOne(id);

    await this.ridersRepository.remove(find);
    return id;
  }

  async getRidersLocation(latitude: number, longitude: number) {
    const findRiders = await this.findAll();
    const locationList = [];

    if (findRiders === null) {
      return null;
    }

    findRiders.map((rider) => {
      locationList.push({
        id: rider.id,
        name: rider.name,
        image: rider.image,
        distance: getDistance(rider.latitude, rider.longitude, latitude, longitude),
        rate: rider.sum / rider.count,
      });
    });

    return locationList.sort((a, b) => a.distance - b.distance);
  }
}
