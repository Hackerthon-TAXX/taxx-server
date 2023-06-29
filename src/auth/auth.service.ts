import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/entities/users.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async jwtLogin(users: Users) {
    if (users) {
      const payload = {
        sub: users.id,
      };

      const token = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_KEY || 'TAXX!',
      });

      return {
        token,
      };
    }
  }
}
