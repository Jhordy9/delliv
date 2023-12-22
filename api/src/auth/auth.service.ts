import {
  Injectable,
  Dependencies,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Dependencies(UsersService, JwtService)
@Injectable()
export class AuthService {
  usersService: UsersService;
  jwtService: JwtService;
  constructor(usersService: UsersService, jwtService: JwtService) {
    this.usersService = usersService;
    this.jwtService = jwtService;
  }

  async signIn(email: string, password: string) {
    const user = await this.usersService.findOne(email);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { name: user.name, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
