import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  async signup(dto: AuthDto) {
    try {
      const hash = await argon.hash(dto.password);
      console.log(hash);
      const user = await this.prisma.user.create({
        data: {
          fullName: dto.fullName,
          phone: dto.phone,
          role: dto.role,
          email: dto.email,
          password: hash,
        },
        select: {
          fullName: true,
          phone: true,
          role: true,
          email: true,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credetials are taken');
        } else {
          throw error;
        }
      }
    }
  }

  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Credetials are not Correct!');
    }

    const pwMatches = await argon.verify(user.password, dto.password);

    if (!pwMatches) {
      throw new ForbiddenException('Credetials are no correct!');
    }

    return this.tokenGenerate(user.id, user.fullName, user.role, user.email);
  }

  tokenGenerate(userId: number, fullName: string, role: string, email: string) {
    const payload = {
      sub: userId,
      fullName,
      email,
      role,
    };
    return this.jwt.signAsync(payload, {
      expiresIn: '120m',
      secret: 'brothers',
    });
  }
}
