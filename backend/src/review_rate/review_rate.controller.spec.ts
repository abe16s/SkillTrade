import { Test, TestingModule } from '@nestjs/testing';
import { ReviewRateController } from './review_rate.controller';

describe('ReviewRateController', () => {
  let controller: ReviewRateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewRateController],
    }).compile();

    controller = module.get<ReviewRateController>(ReviewRateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
