import { Test, TestingModule } from '@nestjs/testing';
import { TechnicianController } from './technician.controller';

describe('TechnicianController', () => {
  let controller: TechnicianController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TechnicianController],
    }).compile();

    controller = module.get<TechnicianController>(TechnicianController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
