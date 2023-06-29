import { Injectable } from '@nestjs/common';
import { RidersService } from './riders/riders.service';
import {
  getDistance,
  getRandomDistance,
  strDistance,
} from './common/utils/useful.utils';

@Injectable()
export class AppService {
  constructor(private readonly ridersService: RidersService) {}

  getHello(): string {
    return 'Online';
  }

  async getRiderMove(riderId: number, latitude: number, longitude: number) {
    const findRiders = await this.ridersService.findOne(riderId);
    let moveLatitude = 0;
    let moveLongitude = 0;

    if (findRiders.latitude < latitude) {
      moveLatitude = findRiders.latitude + getRandomDistance();
    } else {
      moveLatitude = findRiders.latitude - getRandomDistance();
    }

    if (findRiders.longitude < longitude) {
      moveLongitude = findRiders.longitude + getRandomDistance();
    } else {
      moveLongitude = findRiders.longitude - getRandomDistance();
    }

    await this.ridersService.move(findRiders.id, {
      latitude: moveLatitude,
      longitude: moveLongitude,
    });

    return {
      id: findRiders.id,
      latitude: moveLatitude,
      longitude: moveLongitude,
      text: strDistance(moveLatitude, moveLongitude, latitude, longitude),
      distance: getDistance(moveLatitude, moveLongitude, latitude, longitude),
    };
  }
}
