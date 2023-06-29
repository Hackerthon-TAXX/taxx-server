import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Playload } from './jwt.payload';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY || 'TAXX!',
      ignoreExpiration: false,
    });
  }

  async validate(payload: Playload) {
    const user = await this.usersService.findOne(parseInt(payload.sub));

    if (user) {
      return user.id;
    }
  }
}
