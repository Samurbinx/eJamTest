import { Module, Global } from '@nestjs/common';
import { SuperheroesController } from './superheroes.controller';
import { SuperheroesService } from './superheroes.service';

@Global()
@Module({
  controllers: [SuperheroesController],
  providers: [SuperheroesService],
  exports: [SuperheroesService]
})

export class SuperheroesModule {
  constructor(private superheroesService: SuperheroesService) {}
}
