import { Test, TestingModule } from '@nestjs/testing';
import { ModulesResolver } from './modules.resolver';

describe('ModulesResolver', () => {
  let resolver: ModulesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModulesResolver],
    }).compile();

    resolver = module.get<ModulesResolver>(ModulesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
