import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('trader')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() user: AuthDto) {
    return this.authService.signup(user);
  }

  @Post('signin')
  signin(@Body() dto: any) {
    return this.authService.signin(dto);
  }
}
