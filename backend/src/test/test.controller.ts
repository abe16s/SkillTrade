import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { IsCustomerGuard, IsTechnicianGuard } from 'src/auth/guards';

@Controller('test')
export class TestController {
  @UseGuards(AuthGuard('jwt'), IsCustomerGuard)
  @Post('me')
  test(@Req() req: Request) {
    return req.user;
  }
}
