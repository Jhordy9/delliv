import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Post('register')
  async register(
    @Body() registerDto: { email: string; password: string; name: string },
  ) {
    const { email, password, name } = registerDto;
    return await this.usersService.register(email, password, name);
  }
}
