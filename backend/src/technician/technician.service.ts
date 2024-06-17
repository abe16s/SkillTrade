import { Injectable } from '@nestjs/common';
import { TechnicianDto } from './dto/technician.dto';
import { PrismaService } from 'src/prisma/prisma.service';
// import { Request } from 'express';

@Injectable()
export class TechnicianService {
  constructor(private readonly prisma: PrismaService) {}
  async findAllTechnicianProfiles() {
    const result = await this.prisma.technician.findMany({
      select: {
        fullName: true,
        skills: true,
        id: true,
      },
    });
    return result;
  }
  async findTechnicianProfile(technicianId: number) {
    const result = await this.prisma.technician.findUnique({
      where: {
        id: technicianId,
      },
      select: {
        fullName: true,
        skills: true,
        phone: true,
        experience: true,
        educationLevel: true,
        availableLocation: true,
        additionalBio: true,
        email: true,
      },
    });
    return result;
  }

  async updateTechnicianProfile(
    technicianId: number,
    profileUpdate: TechnicianDto,
  ) {
    return await this.prisma.technician.update({
      where: {
        id: technicianId,
      },
      data: profileUpdate,
    });
  }
}
