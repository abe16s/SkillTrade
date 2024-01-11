import { Body, UseGuards, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { AuthGuard } from '@nestjs/passport';
import { IsTechnicianGuard, IsCustomerGuard } from 'src/auth/guards';


@Controller('bookings')
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) { }
    
    @Get('technician/:id')
    @UseGuards(AuthGuard('jwt'), IsTechnicianGuard)
    findAllTechnicianBookings(@Param('id', ParseIntPipe) id: number){
        return this.bookingsService.findAllTechnicianBookings(id)
    }

    @Get('customer/:id')
    @UseGuards(AuthGuard('jwt'), IsCustomerGuard)
    findAllCustomerBookings(@Param('id', ParseIntPipe) id: number){
        return this.bookingsService.findAllCustomerBookings(id)
    }


    @Post()
    @UseGuards(AuthGuard('jwt'), IsCustomerGuard)
    createBooking(@Body(ValidationPipe) booking: CreateBookingDto){
        console.log("hello")
        return this.bookingsService.createBooking(booking)
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
    updateBooking(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) bookingUpdate: UpdateBookingDto){
        return this.bookingsService.updateBooking(id, bookingUpdate)
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), IsCustomerGuard)
    deleteBooking(@Param('id', ParseIntPipe) id: number){
        return this.bookingsService.deleteBooking(id)
    }


}
