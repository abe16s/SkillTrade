import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import * as jwtEx from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    let model_type: any;
    let data: any;
    if (dto.role === 'customer') {
      model_type = this.prisma.user;
      data = {
        fullName: dto.fullName,
        phone: dto.phone,
        role: dto.role,
        email: dto.email,
        password: hash,
      };
    } else if (dto.role === 'technician') {
      model_type = this.prisma.technician;
      data = {
        fullName: dto.fullName,
        phone: dto.phone,
        role: dto.role,
        email: dto.email,
        skills: dto.skills,
        experience: dto.experience,
        educationLevel: dto.educationLevel,
        availableLocation: dto.availableLocation,
        additionalBio: dto.additionalBio,
        password: hash,
      };
    }
    try {
      const user = await model_type.create({
        data: data,
        select: {
          fullName: true,
          phone: true,
          role: true,
          email: true,
        },
      });
      console.log(user);
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

  async signin(dto: any) {
    let user;
    if (dto.role === 'customer') {
      user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
    } else if (dto.role === 'technician') {
      user = await this.prisma.technician.findUnique({
        where: {
          email: dto.email,
        },
      });
    }

    if (!user) {
      throw new ForbiddenException('Credetials are not Correct! here');
    }

    const pwMatches = await argon.verify(user.password, dto.password);

    if (!pwMatches) {
      throw new ForbiddenException('Credetials are not correct!');
    }

    return this.tokenGenerate(user.id, user.fullName, user.role, user.email);
  }

  async tokenGenerate(
    userId: number,
    fullName: string,
    role: string,
    email: string,
  ) {
    const payload = {
      sub: userId,
      fullName,
      email,
      role,
    };
    const token: any = await this.jwt.signAsync(payload, {
      expiresIn: '1y',
      secret: 'brothers',
    });
    return {
      access_token: token,
      role,
      userId,
    };
  }

  validateToken(token: string): any {
    try {
      const decodedToken = jwtEx.verify(token, 'brothers');
      console.log(decodedToken);
      if (decodedToken) {
        return decodedToken;
      }
    } catch (error) {
      console.error('JWT verification error:', error.message);
      return false;
    }
  }
}
