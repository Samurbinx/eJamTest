import { Module } from '@nestjs/common';
import { SuperheroesModule } from './superheroes/superheroes.module';
import { SuperheroesService } from './superheroes/superheroes.service';

@Module({
  imports: [SuperheroesModule],
  providers: [SuperheroesService],
})
export class AppModule {}
