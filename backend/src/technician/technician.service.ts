import { Injectable, Req } from '@nestjs/common';
import { TechnicianDto } from './dto/technician.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class TechnicianService {
  constructor(private readonly prisma: PrismaService) {}
  async findTechnicianProfile(technicianId: number) {
    // if (technicianId === user) {
      const result = await this.prisma.technician.findUnique({
        where: {
          id: technicianId,
        },
      });
      return result;
    // }
  }

    async updateTechnicianProfile(technicianId: number, profileUpdate: TechnicianDto){
        return await this.prisma.technician.update({
            where: {
                id: technicianId,
            },
            data: profileUpdate,

          });
    }
}
