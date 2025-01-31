import { BadRequestException, Injectable } from '@nestjs/common';
import { Superhero } from './interfaces/superhero.interface';

@Injectable()
export class SuperheroesService {

   // Array of superheroes
   private readonly superheroes: Superhero[] = [
      { name: 'Humble man', superpower: 'Super humble', humilityScore: 10 }
   ];

   // Method to get all superheroes, sorted by humility score in descending order
   getAll(): Superhero[] {
      return this.superheroes.sort((a,b) => b.humilityScore - a.humilityScore);
   }
   
   // Method to add a superhero
   add(superhero: Superhero){
      if (superhero.humilityScore < 1 || superhero.humilityScore > 10) {
         throw new BadRequestException('The humility score must be between 1 and 10');
      }
      this.superheroes.push(superhero);
   }

   
}
