import { Test, TestingModule } from '@nestjs/testing';
import { LettersCombinationService } from './letters-combination.service';

describe('LettersCombinationService', () => {
  let service: LettersCombinationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LettersCombinationService],
    }).compile();

    service = module.get<LettersCombinationService>(LettersCombinationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
