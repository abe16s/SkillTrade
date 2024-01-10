import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
    constructor(private readonly prisma: PrismaService) {}

    async findAllTechnicianBookings(technicianId: number){
        const results = await this.prisma.booking.findMany({
            where: {
              technicianId: {
                equals: technicianId,
              },
            },
          });
        if(results){
            return results
        }

    }
    async findAllCustomerBookings(customerId: number){
      const results = await this.prisma.booking.findMany({
          where: {
            customerId: {
              equals: customerId,
            },
          },
        });
      if(results){
          return results
      }

    }
    async findOneBooking(id: number){
      const results = await this.prisma.booking.findUnique({
          where: {
            id: id,
          },
        });
      return results
    
    
    }

    async createBooking(booking: CreateBookingDto){
      console.log("hello00")
      const result = await this.prisma.booking.findUnique({
            where : {
                customerId_technicianId_serviceDate: {
                    customerId: booking.customerId,
                    technicianId: booking.technicianId,
                    serviceDate: new Date(booking.serviceDate),
                }
                
            }
      })
      console.log(result)
      if (!result){
        const newBooking = await this.prisma.booking.create({
              data: {
                customerId: booking.customerId,
                technicianId: booking.technicianId,
                serviceDate: new Date(booking.serviceDate),
                serviceNeeded: booking.serviceNeeded,
                problemDescription: booking.problemDescription,
                status:"pending",

              },
            });
            return newBooking
        }
        
      return {}
    }

    async updateBooking(id: number, updatedBooking: UpdateBookingDto){
      if ("serviceDate" in updatedBooking) {
        updatedBooking.serviceDate =new Date(updatedBooking.serviceDate)
      }
      
      await this.prisma.booking.update({
        where: {
            id:id,
        },
        data: updatedBooking,
         
      });
      return  this.findOneBooking(id)
    }
   
    async deleteBooking(id: number){
        return await this.prisma.booking.delete({
          where: {
            id: id,
          }
        });
    }

}
