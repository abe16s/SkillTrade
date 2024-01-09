import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthDto } from './dto';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { IsCustomerGuard, IsTechnicianGuard } from './guards';

@Module({
  imports: [AuthDto, JwtModule.register({})],
  providers: [AuthService, JwtStrategy, IsTechnicianGuard, IsCustomerGuard],
  controllers: [AuthController],
})
export class AuthModule {}
