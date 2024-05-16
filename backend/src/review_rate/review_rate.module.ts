import { Module } from '@nestjs/common';
import { ReviewRateService } from './review_rate.service';
import { ReviewRate } from './review_rate';
import { ReviewRateController } from './review_rate.controller';

@Module({
  providers: [ReviewRateService, ReviewRate],
  controllers: [ReviewRateController],
})
export class ReviewRateModule {}
