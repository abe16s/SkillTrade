import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { AuthGuard } from '@nestjs/passport';
import { IsCustomerGuard, IsTechnicianGuard } from 'src/auth/guards';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [BookingsService, AuthService, JwtService],
  controllers: [BookingsController]
})
export class BookingsModule {}
