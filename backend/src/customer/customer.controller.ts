import { Controller, Param, Get, Patch, Body, ParseIntPipe, ValidationPipe} from '@nestjs/common';

@Controller('customer')
export class CustomerController {
    @Get(':id')
    findCustomerProfile(@Param('id', ParseIntPipe) id: number){
        // return this.bookingsService.findAllTechnicianBookings(id)
        return {id}
    }

    // @Patch(':id')
    // updateCustomerProfile(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) bookingUpdate: UpdateBookingDto){
    //     return this.bookingsService.updateBooking(id, bookingUpdate)
    // }


}
