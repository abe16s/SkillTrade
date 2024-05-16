import { Test, TestingModule } from '@nestjs/testing';
import { ReviewRateService } from './review_rate.service';

describe('ReviewRateService', () => {
  let service: ReviewRateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewRateService],
    }).compile();

    service = module.get<ReviewRateService>(ReviewRateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
