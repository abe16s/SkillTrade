import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('bookings')
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) { }
    
    @Get('technician/:id')
    findAllTechnicianBookings(@Param('id', ParseIntPipe) id: number){
        return this.bookingsService.findAllTechnicianBookings(id)
    }

    @Get('customer/:id')
    findAllCustomerBookings(@Param('id', ParseIntPipe) id: number){
        return this.bookingsService.findAllCustomerBookings(id)
    }

    @Get(':id')
    findOneBooking(@Param('id', ParseIntPipe) id: number){
        return this.bookingsService.findOneBooking(id)
    }

    @Post()
    createBooking(@Body(ValidationPipe) booking: CreateBookingDto){
        return this.bookingsService.createBooking(booking)
    }

    @Patch(':id')
    updateBooking(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) bookingUpdate: UpdateBookingDto){
        return this.bookingsService.updateBooking(id, bookingUpdate)
    }

    @Delete(':id')
    deleteBooking(@Param('id', ParseIntPipe) id: number){
        return this.bookingsService.deleteBooking(id)
    }


}
