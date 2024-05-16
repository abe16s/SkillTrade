import {
  IsEnum,
  IsOptional,
  IsNumber,
  IsString,
  IsNotEmpty,
} from 'class-validator';
enum Status {
  DECLINED = 'declined',
  SERVICED = 'serviced',
  ACCEPTED = 'accepted',
  PENDING = 'pending',
}
export class CreateBookingDto {
  @IsNumber()
  customerId: number;

  @IsNumber()
  technicianId: number;

  @IsNotEmpty({ message: 'Date cannot be empty' })
  serviceDate: Date;

  @IsString()
  @IsNotEmpty({ message: 'Cannot be empty' })
  serviceNeeded: string;

  @IsString()
  @IsNotEmpty({ message: 'Cannot be empty' })
  problemDescription: string;

  @IsOptional()
  @IsEnum(Status, { message: 'Status is not valid' })
  status: Status;

  @IsOptional()
  @IsString()
  serviceLocation: string;
}
