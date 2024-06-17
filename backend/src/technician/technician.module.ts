import { Module } from '@nestjs/common';
import { TechnicianService } from './technician.service';
import { TechnicianController } from './technician.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
@Module({
  providers: [TechnicianService, AuthService, JwtService],
  controllers: [TechnicianController],
})
export class TechnicianModule {}
