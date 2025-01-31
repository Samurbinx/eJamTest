import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroesService } from './superheroes.service';
import { BadRequestException } from '@nestjs/common';
import { Superhero } from './interfaces/superhero.interface';

describe('SuperheroesService', () => {
  let service: SuperheroesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperheroesService],
    }).compile();

    service = module.get<SuperheroesService>(SuperheroesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('add', () => {
    it('should throw BadRequestException if humilityScore is less than 1', () => {
      const superhero: Superhero = { name: 'Test Hero', superpower: 'Test Power', humilityScore: 0 };
      expect(() => service.add(superhero)).toThrow(BadRequestException);
    });

    it('should throw BadRequestException if humilityScore is greater than 10', () => {
      const superhero: Superhero = { name: 'Test Hero', superpower: 'Test Power', humilityScore: 11 };
      expect(() => service.add(superhero)).toThrow(BadRequestException);
    });

    it('should add superhero when humilityScore is between 1 and 10', () => {
      const superhero: Superhero = { name: 'Test Hero', superpower: 'Test Power', humilityScore: 8 };
      service.add(superhero);
      const allSuperheroes = service.getAll();
      expect(allSuperheroes).toContain(superhero);
    });
  });

  describe('getAll', () => {
    it('should return superheroes sorted by humilityScore in descending order', () => {
      const superhero1: Superhero = { name: 'Super Hero A', superpower: 'Test Power A', humilityScore: 9 };
      const superhero2: Superhero = { name: 'Super Hero B', superpower: 'Test Power B', humilityScore: 3 };
      const superhero3: Superhero = { name: 'Super Hero C', superpower: 'Test Power C', humilityScore: 10 };
      
      service.add(superhero1);
      service.add(superhero2);
      service.add(superhero3);

      const allSuperheroes = service.getAll();
      
      expect(allSuperheroes[0].humilityScore).toBeGreaterThanOrEqual(allSuperheroes[1].humilityScore);
      expect(allSuperheroes[1].humilityScore).toBeGreaterThanOrEqual(allSuperheroes[2].humilityScore);
    });
  });
});