import {
  Controller,
  Param,
  Get,
  Patch,
  Body,
  UseGuards,
  ParseIntPipe,
  ValidationPipe,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto } from './dto/customer.dto';
import { AuthGuard } from '@nestjs/passport';
import { IsCustomerGuard } from 'src/auth/guards';
import { Request } from 'express';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findCustomerProfile(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.findCustomerProfile(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), IsCustomerGuard)
  updateCustomerProfile(
    @Req() request: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) profileUpdate: CustomerDto,
  ) {
    const user = request.user;
    if (id === (user as { sub: number }).sub) {
      return this.customerService.updateCustomerProfile(id, profileUpdate);
    } else {
      throw new ForbiddenException('Access denied to Unauthorized user');
    }
  }
}
