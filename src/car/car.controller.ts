import { Controller,Get, Post,Body } from '@nestjs/common';
import {CarService} from './car.service';

@Controller('car')
export class CarController {

    constructor(private carService:CarService){}
    
   @Get()
   async getCars(){
    return this.carService.getCars();
   }
   @Post('/push')
   async pushCars(@Body() createCarDto: { name: string; color: string }){
    return this.carService.pushCars(createCarDto);
   }

}
