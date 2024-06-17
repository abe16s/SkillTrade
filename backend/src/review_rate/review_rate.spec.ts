import { Test, TestingModule } from '@nestjs/testing';
import { ReviewRate } from './review_rate';

describe('ReviewRate', () => {
  let provider: ReviewRate;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewRate],
    }).compile();

    provider = module.get<ReviewRate>(ReviewRate);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
