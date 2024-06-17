import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllTechnicianBookings(technicianId: number) {
    const result = await this.prisma.technician.findUnique({
      where: {
        id: technicianId,
      },
      select: {
        bookings: true,
      },
    });
    return result;
  }
  async findAllCustomerBookings(customerId: number) {
    const result = await this.prisma.user.findUnique({
      where: {
        id: customerId,
      },
      select: {
        bookings: true,
      },
    });
    return result;
  }
  async findOneBooking(id: number) {
    const results = await this.prisma.booking.findUnique({
      where: {
        id: id,
      },
    });
    return results;
  }

  async createBooking(dto: CreateBookingDto) {
    const result = await this.prisma.booking.findUnique({
      where: {
        customerId_technicianId_serviceDate: {
          customerId: dto.customerId,
          technicianId: dto.technicianId,
          serviceDate: new Date(dto.serviceDate),
        },
      },
    });
    if (!result) {
      const newBooking = await this.prisma.booking.create({
        data: {
          customerId: dto.customerId,
          technicianId: dto.technicianId,
          serviceDate: new Date(dto.serviceDate),
          serviceNeeded: dto.serviceNeeded,
          problemDescription: dto.problemDescription,
          serviceLocation: dto.serviceLocation,
          status: 'pending',
        },
      });
      return newBooking;
    }
    return { message: 'Booking Already exists!' };
  }

  async updateBooking(id: number, updatedBooking: UpdateBookingDto) {
    if ('serviceDate' in updatedBooking) {
      updatedBooking.serviceDate = new Date(updatedBooking.serviceDate);
    }
    return await this.prisma.booking.update({
      where: {
        id: id,
      },
      data: updatedBooking,
    });
  }

  async deleteBooking(id: number) {
    return await this.prisma.booking.delete({
      where: {
        id: id,
      },
    });
  }
}
