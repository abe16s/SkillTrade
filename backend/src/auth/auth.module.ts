import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthDto } from './dto';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [AuthDto, JwtModule.register({})],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
