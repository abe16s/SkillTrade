import {
  Controller,
  Param,
  Get,
  Patch,
  UseGuards,
  Body,
  ParseIntPipe,
  ValidationPipe,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { TechnicianService } from './technician.service';
import { TechnicianDto } from './dto/technician.dto';
import { AuthGuard } from '@nestjs/passport';
import { IsTechnicianGuard } from 'src/auth/guards';
import { Request } from 'express';

@Controller('technician')
export class TechnicianController {
  constructor(private readonly technicianService: TechnicianService) {}
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findTechnicianProfile(
    @Req() request: Request,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const user = request.user;
    // if (id === (user as { sub: number }).sub) {
    return this.technicianService.findTechnicianProfile(id);
    // } else {
    //   throw new ForbiddenException('Access denied to Unauthorized user');
    // }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAllTechnicianProfiles() {
    return this.technicianService.findAllTechnicianProfiles();
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), IsTechnicianGuard)
  updateTechnicianProfile(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: Request,
    @Body(ValidationPipe) profileUpdate: TechnicianDto,
  ) {
    const user = request.user;
    if (id === (user as { sub: number }).sub) {
      return this.technicianService.updateTechnicianProfile(id, profileUpdate);
    } else {
      throw new ForbiddenException('Access denied to Unauthorized user');
    }
  }
}
