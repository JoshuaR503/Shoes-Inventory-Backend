import { Test, TestingModule } from '@nestjs/testing';
import { ShoesService } from './shoes.service';

describe('ShoesService', () => {
  let service: ShoesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShoesService],
    }).compile();

    service = module.get<ShoesService>(ShoesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
