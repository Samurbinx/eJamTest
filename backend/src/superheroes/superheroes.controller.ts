import { SuperheroesService } from './superheroes.service';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { superheroDto } from './dto/superhero.dto';
import { Superhero } from './interfaces/superhero.interface';

@Controller('superheroes')
export class SuperheroesController {
   constructor(private superheroesService: SuperheroesService) {}
   
   @Get()
   async getAll(): Promise<Superhero[]> {
      return this.superheroesService.getAll();
   }

   @Post()
   async add(@Body() superheroDto: superheroDto) {
      this.superheroesService.add(superheroDto);
   }
  

}

