import { Injectable } from "@nestjs/common";
import { UsersService } from "./users/users.service";
import { RidersService } from "./riders/riders.service";
import { getDistance } from "./common/utils/useful.utils";

@Injectable()
export class AppService {
  constructor(private readonly usersService: UsersService, private readonly ridersService: RidersService) {}

  getHello(): string {
    return "Online";
  }

  async getRiderMove(riderId: number, latitude: number, longitude: number) {
    const findRiders = await this.ridersService.findOne(riderId);

    const moveLatitude = findRiders.latitude + 0.0003;
    const moveLongitude = findRiders.longitude + 0.0003;

    await this.ridersService.move(findRiders.id, {
      latitude: moveLatitude,
      longitude: moveLongitude,
    });

    return {
      id: findRiders.id,
      latitude: moveLatitude,
      longitude: moveLongitude,
      distance: getDistance(moveLatitude, moveLongitude, latitude, longitude),
    };
  }
}
