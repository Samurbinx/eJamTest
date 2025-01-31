import { SuperheroesService } from './superheroes.service';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { superheroDto } from './dto/superhero.dto';
import { Superhero } from './interfaces/superhero.interface';

@Controller('superheroes')
export class SuperheroesController {
   constructor(private superheroesService: SuperheroesService) {}
   
   @Get() // HTTP GET request to fetch all superheroes
   async getAll(): Promise<Superhero[]> {
      return this.superheroesService.getAll(); // Fetching all superheroes from the service
   }

   @Post() // HTTP POST request to add a new superhero
   async add(@Body() superheroDto: superheroDto) {
      this.superheroesService.add(superheroDto); // Adding the new superhero through the service
   }
  

}

