import { Controller, Param, Get, Patch, UseGuards, Body, ParseIntPipe, ValidationPipe} from '@nestjs/common';
import { TechnicianService } from './technician.service';
import { TechnicianDto } from './dto/technician.dto';
import { AuthGuard } from '@nestjs/passport';
import { IsTechnicianGuard} from 'src/auth/guards';

@Controller('technician')
export class TechnicianController {
    constructor(private readonly technicianService: TechnicianService) { }
    @Get(':id')
    @UseGuards(AuthGuard('jwt'), IsTechnicianGuard)
    findTechnicianProfile(@Param('id', ParseIntPipe) id: number){
        return this.technicianService.findTechnicianProfile(id)
    }

    @Patch(':id')
    // @UseGuards(AuthGuard('jwt'), IsTechnicianGuard)
    updateTechnicianProfile(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) profileUpdate: TechnicianDto){
        return this.technicianService.updateTechnicianProfile(id, profileUpdate)
    }
}
